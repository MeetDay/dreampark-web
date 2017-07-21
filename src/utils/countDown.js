export default function countDown(count, cb) {
     if (count < 0) return;
     cb(count)
     setTimeout(() => {
         countDown(count - 1, cb)
     }, 1000)
}
