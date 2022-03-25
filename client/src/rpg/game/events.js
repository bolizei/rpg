export default class events {
    constructor() {
        this._events = []
    }

    on(eventname, listener, once = false) {
        if(!this._events[eventname]) {
            this._events[eventname] = []
        }
        this._events[eventname].push({'listener': listener, 'once': once})
        console.log('added eventlistener to ', eventname, 'once:', once)
    }

    once(eventname, listener) {
        this.on(eventname, listener, true)
    }

    countListeners(eventname) {
        return this._events[eventname] ? this._events[eventname].length : 0
    }

    fireEvent(eventname, data) {
        console.log('called fire event', eventname)
        let c = this.countListeners(eventname)
        if(c > 0) {
            console.log('fire ' + c + ' events for', eventname)

            for(let i = 0; i < c; i++) {
                
                this._events[eventname][i].listener(data)
                console.log('fired event', this._events[eventname][i].fn)

                if(this._events[eventname][i].once) {
                    console.log('deleted event')
                    this._events[eventname].splice(i, 1)
                    if(i != c) {
                        i--
                        c--
                    }
                }
            }

        } else {
            console.log('event ' + eventname + 'was called but had no listeners')
        }
    }

    removeListener(eventname, listener) {
        // todo: hopefully no duplicate listeners
        let i = this._events[eventname].findIndex(element => element.listener = listener)
        if(i > 0) {
            this._events[eventname].splice(i, 1)
            console.log('removed a listener from', eventname)
        } else {
            console.log('cannot remove listener, it doesnt exist', eventname)
        }
    }
}