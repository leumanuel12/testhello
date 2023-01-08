export default function ErrorMessages(props){


    //shared button
    function closeButton(){
        return (
            <button className="float-right">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                 <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
             </svg>
             </button>
        )
    }

    //shared classes
    function errorClasses(){
        return " my-3 max-w-3xl font-medium p-3 border-l-8 border-solid border-2 "
    }
    

    return (
        <>
            {props.pageMessage.code=='1' ? (
                <div className={"bg-green-100 text-green-800 border-green-500"+errorClasses()}>
                    {props.pageMessage.msg}
                    {closeButton()}
                </div>
            ) : null}

            {props.pageMessage.code=='2' ? (
                <div className={"bg-red-100 text-red-800 border-red-500"+errorClasses()}>
                    {props.pageMessage.msg}
                    {closeButton()}
                </div>
            ) : null}

            {props.pageMessage.code=='3' ? (
                <div className={"bg-orange-100 text-orange-500 border-orange-500"+errorClasses()}>
                    {props.pageMessage.msg}
                    {closeButton()}
                </div>
            ) : null}
        </>

    );
}