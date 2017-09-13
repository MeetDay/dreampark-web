/**
 * @Author: WangChao
 * @Date:   2017-09-05T14:16:46+08:00
 * @Email:  crazyitcoder9527@126.com
 * @Project: dreampark-web
 * @Last modified by:   WangChao
 * @Last modified time: 2017-09-06T11:36:11+08:00
 */

 import React from 'react'
 import PropTypes from 'prop-types'
 import classNames from 'classnames'
 import { message } from 'antd'
 import { ticketExisted } from '../BuyTicketNow/ticketHelper'
 import { convertToLocalDate } from '../../../../utils/dateformat'

 export default class BuyHotelTickets extends React.Component {
     static propTypes = {
         title: PropTypes.string,
         show: PropTypes.bool,
         startDate: PropTypes.number,
         endDate: PropTypes.number,
         tickets: PropTypes.array,
         rooms: PropTypes.array,
         pushState: PropTypes.func.isRequired,
         onClickBuyTicketNow: PropTypes.func,
         onClickCancel: PropTypes.func.isRequired
     }
     static defaultProps = {
         title: '酒店预订',
         show: false,
         startDate: 1504627200
     }

     constructor(props) {
         super(props);
         this.handleClickBuyTicketNow = (e) => this._handleClickBuyTicketNow(e);
         this.handleClickTicket = (ticket) => this._handleClickTicket(ticket);
         this.handleClickRoom = (room) => this._handleClickRoom(room);
         this.checkedAllTicketsWithNextSelectedTicket = (nextSelectedTicket) => this._checkedAllTicketsWithNextSelectedTicket(nextSelectedTicket)

         this.state = {
             visible: false,
             showBackgroundColor: false,
             totalPrice: props.rooms[0].price,
             price: props.rooms[0].price,
             selectedRoom: props.rooms[0],
             startDays: props.rooms[0].start_days,
             selectedTickets: []
         };

         if (this.props.startDate && this.props.endDate) {
             const oneDayMisecs = 24 * 3600 * 1000;
             const daysBetweenEndAndStart = Math.ceil((new Date(this.props.endDate * 1000) - new Date(this.props.startDate * 1000)) / oneDayMisecs);
             const daysBetweenEndAndNow = Math.ceil((new Date(this.props.endDate * 1000) - Date.now()) / oneDayMisecs);
             const daysBetweenStartAndNow = Math.ceil((new Date(this.props.startDate * 1000) - Date.now()) / oneDayMisecs);
             this.timeTickets = [];
             if (daysBetweenEndAndNow > 0) {
                 const restDays = Math.min(daysBetweenEndAndStart, daysBetweenEndAndNow);
                 const startDate = daysBetweenStartAndNow > 0 ? this.props.startDate * 1000 : (this.props.startDate * 1000 + Math.abs(daysBetweenStartAndNow)*oneDayMisecs);
                 for(let index = 0; index <= restDays; index ++) {
                     this.timeTickets.push({
                         id: index,
                         timestamp: startDate + oneDayMisecs * index
                     });
                 }
             }
         }
     }

     componentWillReceiveProps(nextProps) {
         if (nextProps.show) {
             setTimeout(() => { this.setState({ visible: nextProps.show, showBackgroundColor: nextProps.show }) }, 0)
         } else {
             setTimeout(() => { this.setState({ showBackgroundColor: nextProps.show }) }, 500)
             setTimeout(() => { this.setState({ visible: nextProps.show }) }, 600)
         }
     }

     _handleClickBuyTicketNow(e) {
         e.preventDefault()
         if (this.state.selectedTickets && this.state.selectedTickets.length > 0 && this.state.selectedTickets.length >= this.state.startDays) {
             const sortedTickets = this.state.selectedTickets.sort((ticket, anthorTicket) => ticket.timestamp > anthorTicket.timestamp);
             const minDateTicket = sortedTickets[0], maxDateTicket = sortedTickets[sortedTickets.length - 1];
             const queryParams = {
                 typeName: this.state.selectedRoom.type_name,
                 startDate: minDateTicket.timestamp,
                 endDate: maxDateTicket.timestamp,
                 price: this.state.totalPrice
             };
             this.props.pushState(`/pay/ticketinfo/${this.props.tickets[0].id}?hotelTicketInfo=${JSON.stringify(queryParams)}`);
            //  location.href = `/pay/ticketinfo/${this.props.tickets[0].id}?hotelTicketInfo=${JSON.stringify(queryParams)}`;
         } else {
             if (this.state.selectedTickets.length < this.state.startDays) {
                 message.info(`该房型${this.state.startDays}天起订!`);
             } else {
                 message.info(`请选择您要预订房型的日期!`);
             }
         }
     }

     _handleClickRoom(room) {
         this.setState({
             price: room.price,
             totalPrice: room.price*this.state.selectedTickets.length,
             selectedRoom: room,
             startDays: room.start_days
         })
     }

     _handleClickTicket(nextSelectedTicket) {
         if (ticketExisted(this.state.selectedTickets, nextSelectedTicket)) {
             const nextSelectedTickets = this.state.selectedTickets.filter(item => item.timestamp < nextSelectedTicket.timestamp);
             this.setState((preState) => ({
                 selectedTickets: [...nextSelectedTickets],
                 totalPrice: nextSelectedTickets.length * preState.price
             }))
         } else {
             let minDateTicketOfSelectedTickets = nextSelectedTicket;
             if (this.state.selectedTickets && this.state.selectedTickets.length > 0) {
                 minDateTicketOfSelectedTickets = this.state.selectedTickets.sort((ticket, anthorTicket) => ticket.timestamp > anthorTicket.timestamp)[0];
             }
             if (nextSelectedTicket.timestamp <= minDateTicketOfSelectedTickets.timestamp) {
                 this.setState((preState) => ({
                     selectedTickets: [nextSelectedTicket],
                     totalPrice: preState.price
                 }));
             } else {
                const nextSelectedTickets =this.timeTickets.filter(item => item.timestamp >= minDateTicketOfSelectedTickets.timestamp && item.timestamp <= nextSelectedTicket.timestamp);
                if (nextSelectedTickets && nextSelectedTickets.length > 0) {
                    this.setState(preState => ({
                        selectedTickets: [...nextSelectedTickets],
                        totalPrice: nextSelectedTickets.length * preState.price
                    }));
                }
             }
         }
     }

     isRoomSelected(room, selectedRoom) {
         return room.type_id === selectedRoom.type_id
     }

     render() {
         const styles = require('../BuyTicketNow/BuyTicketNow.scss');
         const hotelStyle = require('./BuyHotelTickets.scss');
         const buyTicketNowStyle = {
             backgroundColor: this.state.showBackgroundColor ? 'rgba(0, 0, 0, .4)' : 'rgba(0, 0, 0, 0)',
             visibility: this.state.visible ? 'visible' : 'hidden'
         }
         const ticketStyle = { bottom: this.props.show ? '0' : '-420px' }
         const isMeetStartDaysCondition = this.state.selectedTickets.length >= this.state.startDays;
         return (
             <div style={buyTicketNowStyle} className={classNames(styles.backgroundTransition, styles.buyTicketNow)}>
                 <div style={ticketStyle} className={classNames(styles.ticket, styles.ticketTransition)}>

                     <div className={styles.header}>
                         <span>{this.props.title}</span>
                         <div onClick={this.props.onClickCancel} className={styles.cancel}><span>取消</span><img src="/assets/arrow_down_black.png" alt="arrow_down_black" /></div>
                     </div>

                     <div className={hotelStyle.middle}>
                         <div className={styles.tip}>选择房型：</div>
                         <div className={hotelStyle.rooms}>
                             <div className={hotelStyle.roomsWrapper}>
                                 {(this.props.rooms && this.props.rooms.length > 0)&&
                                     this.props.rooms.map(room => (<RoomType key={room.type_id} room={room} selected={this.isRoomSelected(room, this.state.selectedRoom)} onRoomClick={this.handleClickRoom} />))
                                 }
                             </div>
                         </div>
                     </div>

                     <div className={styles.footer}>
                         <div className={styles.tip}>选择时间：</div>
                         <div className={styles.choiceTicket}>
                             <div className={styles.choiceTicketWrap}>
                                 {(this.timeTickets && this.timeTickets.length > 0) &&
                                     this.timeTickets.map(ticket => (<TimeSlotTicket key={ticket.id} ticket={ticket} selected={ticketExisted(this.state.selectedTickets, ticket)} onTicketClick={this.handleClickTicket} />))
                                 }
                                 {(this.timeTickets && this.timeTickets.length == 0) &&
                                    <div className={hotelStyle.bookingEnded}><span>预订已结束</span></div>
                                 }
                             </div>
                         </div>
                     </div>

                     <div className={classNames({[hotelStyle.toolBar]: true, [hotelStyle.nonStartDays]: !isMeetStartDaysCondition})}>
                         <div onClick={this.handleClickBuyTicketNow} className={hotelStyle.toolBarWrapper}>
                             <span>价格</span>
                             <span className={hotelStyle.totalPrice}>{`￥${this.state.totalPrice}`}</span>
                             <span>{isMeetStartDaysCondition ? "立刻购买" : `该房型${this.state.startDays}天起订`}</span>
                         </div>
                     </div>

                 </div>
             </div>
         );
     }
 }

class RoomType extends React.Component {
    static propTypes = {
        room: PropTypes.object,
        selected: PropTypes.bool,
        onRoomClick: PropTypes.func.isRequired
    };
    static defaultProps = {
        selected: false
    };

    constructor(props) {
        super(props);
        this.handleClick = (e) => this._handleClick(e);
    }

    _handleClick(e) {
        e.preventDefault();
        this.props.onRoomClick(this.props.room);
    }

    render() {
        const hotelStyle = require('./BuyHotelTickets.scss');
        return (
            <div className={hotelStyle.roomContainer} onClick={this.handleClick}>
                <div className={classNames({ [hotelStyle.roomContainerWrapper]: true, [hotelStyle.roomNormal]: !this.props.selected, [hotelStyle.roomActive]: this.props.selected })}>
                    <span>{this.props.room.type_name}</span>
                    <span className={hotelStyle.roomPrice}>{this.props.room.price}</span>
                </div>
            </div>
        );
    }
}

class TimeSlotTicket extends React.Component {
    static propTypes = {
         ticket: PropTypes.object,
         onTicketClick: PropTypes.func.isRequired,
         selected: PropTypes.bool
    };
    static defaultProps = {
         selected: false
    };

    constructor(props) {
         super(props)
         this.handleClick = (e) => this._handleClick(e)
    }

    _handleClick(e) {
         e.preventDefault()
         this.props.onTicketClick(this.props.ticket)
    }

    render() {
         const styles = require('../BuyTicketNow/BuyTicketNow.scss');
         const triangleStyle = { display: this.props.selected ? 'block' : 'none' };
         const { timestamp } = this.props.ticket;
         const dateObject = convertToLocalDate(timestamp/1000);
         return (
             <div className={styles.timeSlotTicket} onClick={this.handleClick}>
                 <img className={styles.ticketBorder} src="/assets/ticket_border.png" alt="ticket_border" />
                 <div  style={triangleStyle} className={styles.ticketTriangle}>
                     <img src="/assets/triangle.png" alt="triangle" />
                 </div>
                 <div className={styles.ticketContent}>
                     <div>
                         <div className={styles.ticketTop}>{dateObject.month} <span>{dateObject.day}</span></div>
                         <div style={{ fontSize: '12px' }} className={styles.ticketBottom}>{`12:00-次日12:00`}</div>
                     </div>
                 </div>
             </div>
         );
    }
}
