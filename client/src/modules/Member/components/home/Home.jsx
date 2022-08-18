import './home.scss'
import React from 'react';
import Image from "../../../../shared/image/Image";
import similarPlant1 from "../../../../assets/image/6.jpg";
import similarPlant2 from "../../../../assets/image/7.jpg";
import similarPlant3 from "../../../../assets/image/8.jpg";
import similarPlant4 from "../../../../assets/image/9.jpg";

const Home = props => {

    const initStars = <>
        <i className="fa-solid fa-star"/>
        <i className="fa-solid fa-star"/>
        <i className="fa-solid fa-star-half-stroke"/>
        <i className="fa-regular fa-star"/>
        <i className="fa-regular fa-star"/>
    </>

    const initSimilarPlant = (name, src, ribbon) => {
        return (
            <div className={'similar-plant__item'}>
                {!!ribbon && <div className="similar-plant__ribbon-wrapper">
                    <div className="similar-plant__ribbon">{ribbon}</div>
                </div>}

                <Image src={src} alt={name} className={'similar-plant__image'}/>
                <span className={'similar-plant__score'}>{initStars}</span>
                <p className="similar-plant__name">{name}</p>
            </div>
        )
    }

    const plantList = (title) => {
        return (<>
            <div className="similar-plant">
                <p className="similar-plant__title">{title}</p>
                {initSimilarPlant('گیاه ساکولنت تاپسی توروی', similarPlant1, 'جدید')}
                {initSimilarPlant('گیاه کاکتوس کریسمس زرد', similarPlant2)}
                {initSimilarPlant('گیاه آمریکایی دیش باغچه', similarPlant3)}
                {initSimilarPlant('بورس گیاهی آمریکا', similarPlant4)}
                {initSimilarPlant('بورس گیاهی آمریکا', similarPlant4)}
                {initSimilarPlant('بورس گیاهی آمریکا', similarPlant4)}
            </div>
            <hr/>
        </>)
    }

    return <sction className={'home'}>
        <div className={'first-section'}>
            <h2>{'گیاهستان'}</h2>
            <p>{'هر اطلاعاتی در مورد گیاهان رو اینجا پیدا کن'}</p>
        </div>
        <div className={'board'}>
            <p>{'این سایت به زودی فعالیت خود را آغاز خواهد کرد'}</p>
        </div>
        {plantList('گیاهان مرتبط')}
        {plantList('گیاهان جدید')}
        {plantList('گیاهان پرطرفدار')}
    </sction>
}
export default Home;