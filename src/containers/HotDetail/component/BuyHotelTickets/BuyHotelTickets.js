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
 import { ticketExisted } from '../BuyTicketNow/ticketHelper'
 import { convertToLocalDate } from '../../../../utils/dateformat'

 export default class BuyHotelTickets extends React.Component {
     static propTypes = {
         title: PropTypes.string,
         onClickBuyTicketNow: PropTypes.func,
         tickets: PropTypes.array,
         show: PropTypes.bool,
         onClickCancel: PropTypes.func.isRequired
     }
     static defaultProps = {
         title: '酒店预订',
         show: false,
         rooms: [{ id:1, name: '单人间' }, { id:2, name: '大床房' }, { id:3, name: '标准间' }]
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
             totalPrice: 0,
             selectedRoom: props.rooms[0],
             selectedTickets: []
         };
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
         this.props.onClickBuyTicketNow(this.state.selectedTickets[0])
     }

     _handleClickRoom(room) {
         this.setState({
             selectedRoom: room
         })
     }

     _handleClickTicket(ticket) {
         let minDateTicket = ticket;
         if (this.state.selectedTickets && this.state.selectedTickets.length > 0) {
             minDateTicket =
                 this.state.selectedTickets.sort((ticket, anthorTicket) => new Date(ticket.start_time * 1000) > new Date(anthorTicket.start_time * 1000))[0];
         }
         if (ticketExisted(this.state.selectedTickets, ticket)) {
             const nextSelectedTickets = this.state.selectedTickets.filter(item => new Date(item.start_time * 1000) < new Date(ticket.start_time * 1000));
             this.setState((preState) => ({
                 totalPrice: 123,
                 selectedTickets: [...nextSelectedTickets]
             }))
         } else {
             if (new Date(ticket.start_time) < new Date(minDateTicket.start_time)) {
                 this.setState({
                     totalPrice: 1234,
                     selectedTickets: [ticket]
                 })
             } else {
                 const nextSelectedTickets =
                    this.props.tickets.filter(item => {
                        const currentTicketDate = new Date(item.start_time * 1000);
                        return currentTicketDate >= new Date(minDateTicket.start_time * 1000) && currentTicketDate <= new Date(ticket.start_time * 1000)
                    })
                if (nextSelectedTickets && nextSelectedTickets.length > 0) {
                    this.setState(preState => ({
                        totalPrice: 123,
                        selectedTickets: [...nextSelectedTickets]
                    }));
                }
             }
         }
     }

     isRoomSelected(room, selectedRoom) {
         return room.id === selectedRoom.id
     }

     render() {
         const styles = require('../BuyTicketNow/BuyTicketNow.scss');
         const hotelStyle = require('./BuyHotelTickets.scss');
         const buyTicketNowStyle = {
             backgroundColor: this.state.showBackgroundColor ? 'rgba(0, 0, 0, .4)' : 'rgba(0, 0, 0, 0)',
             visibility: this.state.visible ? 'visible' : 'hidden'
         }
         const ticketStyle = { bottom: this.props.show ? '0' : '-420px' }

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
                                 {this.props.rooms &&
                                     this.props.rooms.map(room => (<RoomType key={room.id} room={room} selected={this.isRoomSelected(room, this.state.selectedRoom)} onRoomClick={this.handleClickRoom} />))
                                 }
                             </div>
                         </div>
                     </div>

                     <div className={styles.footer}>
                         <div className={styles.tip}>选择时间：</div>
                         <div className={styles.choiceTicket}>
                             <div className={styles.choiceTicketWrap}>
                                 { this.props.tickets &&
                                     this.props.tickets.map(ticket => (<TimeSlotTicket key={ticket.id} ticket={ticket} selected={ticketExisted(this.state.selectedTickets, ticket)} onTicketClick={this.handleClickTicket} />))
                                  }
                             </div>
                         </div>
                     </div>

                     <div className={styles.toolBar}>
                         <div onClick={this.handleClickBuyTicketNow} className={hotelStyle.toolBarWrapper}>
                             <span>价格</span>
                             <span className={hotelStyle.totalPrice}>{`￥${this.state.totalPrice}`}</span>
                             <span>立刻购买</span>
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
                    <span>{this.props.room.name}</span>
                    <span className={hotelStyle.roomPrice}>200元</span>
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
         const { start_time, end_time } = this.props.ticket;
         const startTime = convertToLocalDate(start_time);
         const endTime = convertToLocalDate(end_time);
         return (
             <div className={styles.timeSlotTicket} onClick={this.handleClick}>
                 <img className={styles.ticketBorder} src="/assets/ticket_border.png" alt="ticket_border" />
                 <div  style={triangleStyle} className={styles.ticketTriangle}>
                     <img src="/assets/triangle.png" alt="triangle" />
                 </div>
                 {/* <div className={styles.separatorLine} /> */}
                 <div className={styles.ticketContent}>
                     <div>
                         <div className={styles.ticketTop}>{startTime.month} <span>{startTime.day}</span></div>
                         <div className={styles.ticketBottom}>{`${startTime.time}-${endTime.time}`}</div>
                     </div>
                 </div>
             </div>
         );
    }
}
