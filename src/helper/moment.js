import moment from 'moment-timezone'

const Moment = (() => {
    // private member
    const formatDate = (date, format) => {
        if(format){
            return date.format(format)
        }else{
            return date.format("YYYY-M-D")
        }
    }

    // public member
    class MomentClass {
        constructor(){
            moment.tz.setDefault("Asia/Jakarta")
            moment.locale("id")
            /* hidding moment warning messages */
            moment.suppressDeprecationWarnings = true
        }

        format(date, format = null){
            return formatDate(moment(date), format)
        }

        timestamp(date, format = null){
            return formatDate(moment.unix(date), format)
        }

        now(format = null){
            return formatDate(moment(), format)
        }

        tomorrow(format = null){
            return formatDate(moment().add(1, "days"), format)
        }

        yesterday(format = null){
            return formatDate(moment().subtract(1, "days"), format)
        }

        last7days(format = null){
            return formatDate(moment().subtract(7, "days"), format)
        }

        last1month(format = null){
            return formatDate(moment().subtract(1, "month"), format)
        }

        last3month(format = null){
            return formatDate(moment().subtract(3, "month"), format)
        }

        fromNow(date, timestamp = false){
            if (timestamp) return moment.unix(date).fromNow()
            else return moment(date).fromNow()
        }
    }

    return MomentClass
})()

export {
    Moment,
    moment
}