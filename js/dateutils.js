const DateUtils = (() => {

    function now() {

        return new Date()
            .toISOString();

    }


    function format(date) {

        if (!date) {
            return "-";
        }


        const value = new Date(date);


        if (Number.isNaN(value.getTime())) {
            return "-";
        }


        return value.toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );

    }


    function formatDateTime(date) {

        if (!date) {
            return "-";
        }


        const value = new Date(date);


        if (Number.isNaN(value.getTime())) {
            return "-";
        }


        return value.toLocaleString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            }
        );

    }


    function isValid(date) {

        const value = new Date(date);

        return !Number.isNaN(
            value.getTime()
        );

    }


    function differenceInDays(first, second) {

        const start = new Date(first);
        const end = new Date(second);


        const difference =
            end - start;


        return Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );

    }


    function isToday(date) {

        const value = new Date(date);
        const today = new Date();


        return (
            value.getDate() === today.getDate()
            &&
            value.getMonth() === today.getMonth()
            &&
            value.getFullYear() === today.getFullYear()
        );

    }


    return {
        now,
        format,
        formatDateTime,
        isValid,
        differenceInDays,
        isToday
    };

})();