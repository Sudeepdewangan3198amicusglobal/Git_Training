const events = new Map();


export function subscribe(
    eventName,
    listener
) {

    if (!events.has(eventName)) {

        events.set(
            eventName,
            new Set()
        );

    }


    events
        .get(eventName)
        .add(listener);


    return () => {

        unsubscribe(
            eventName,
            listener
        );

    };

}



export function unsubscribe(
    eventName,
    listener
) {

    const listeners =
        events.get(eventName);


    if (!listeners) {

        return;

    }


    listeners.delete(listener);


    if (listeners.size === 0) {

        events.delete(eventName);

    }

}



export function publish(
    eventName,
    payload = null
) {

    const listeners =
        events.get(eventName);


    if (!listeners) {

        return;

    }


    listeners.forEach(

        listener => {

            try {

                listener(payload);

            }

            catch (error) {

                console.error(
                    `Event "${eventName}" failed:`,
                    error
                );

            }

        }

    );

}



export function once(
    eventName,
    listener
) {


    const wrapper = payload => {


        listener(payload);


        unsubscribe(
            eventName,
            wrapper
        );


    };


    subscribe(
        eventName,
        wrapper
    );

}



export function clearEvents() {

    events.clear();

}



export default {

    subscribe,
    unsubscribe,
    publish,
    once,
    clearEvents

};