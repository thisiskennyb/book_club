export default function ClubComponent({clubName, bookTitle}){


    return(<>
    <div className="clubContainer">
        <div className="clubItemTitle">
            Club name: 
        </div>
        <div className="clubItemName">
            {clubName} 
        </div>
        <div className="clubItemTitle">
            book name: 
        </div>
        <div className="clubItemName">
            {bookTitle}
        </div>
    </div>
    </>)
}