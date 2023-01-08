import { useEffect, useState } from "react";

export default function ErrorMessages(props){

    const [closebtn, setClosebtn] = useState(false);


    if( props.pageMessage ){

        const code = props.pageMessage.code;
        const mcode = props.pageMessage.mcode;
        let msg = '';

        //ERROR MESSAGES HERE

        //success - green
        if(mcode == 100) msg = 'New record has been added.';
        if(mcode == 101) msg = 'Changes are saved.';

        //errors - red
        if(mcode == 200) msg = 'Record removed succesfully.';

        //warnings - orange
        if(mcode == 300) msg = 'Oh no! Something went wrong.';


        //shared button
        //pending functionality to dismiss message
        function closeButton(){
            return (
                <button 
                    className="float-right"
                    onClick={ () => { setClosebtn(true) } }>
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
        
    
        //ERROR CODES HERE

        if( !closebtn ){

            //success
            if( code === 1 ){
                return <div className={"bg-green-100 text-green-800 border-green-500"+errorClasses()}> {msg} </div>
            }
            
            //errors
            else if( code === 2 ){
                return <div className={"bg-red-100 text-red-800 border-red-500"+errorClasses()}> {msg} </div>
            }
    
            //warnings
            else if( code === 3 ){
                return <div className={"bg-orange-100 text-orange-500 border-orange-500"+errorClasses()}> {msg} </div>
            }


        }
        


            
    } else {
        return null;
    }

    
}