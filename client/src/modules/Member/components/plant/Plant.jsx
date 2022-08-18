import './plant.scss';
import './plant-device.scss';
import React, {useState} from 'react';
import plant from '../../../../assets/image/5.jpg';
import similarPlant1 from '../../../../assets/image/6.jpg';
import similarPlant2 from '../../../../assets/image/7.jpg';
import similarPlant3 from '../../../../assets/image/8.jpg';
import similarPlant4 from '../../../../assets/image/9.jpg';
import poster1 from '../../../../assets/image/10.jpg';
import poster2 from '../../../../assets/image/11.jpg';
import poster3 from '../../../../assets/image/12.jpg';
import poster4 from '../../../../assets/image/13.jpg';
import Image from '../../../../shared/image/Image';

const Plant = props => {
    const DESCRIPTION = {
        DESCRIPTION: 0,
        MAINTENANCE: 1,
        COMMENT: 2,
    }

    const [score, setScore] = useState(false)
    const [poster, setPoster] = useState(poster1)
    const [descriptionTab, setDescriptionTab] = useState(DESCRIPTION.DESCRIPTION)


    const setPlantScore = state => {
        score === state ? setScore(false) : setScore(state)
    }

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
    const descriptionText = <p>
            <b><li>نام</li></b><br/>
        rose واژه‌ای است فرانسوی از لاتین rosa که واژه‌ای دخیل از یونانی ῥόδον rhódo-n (یونانی آیولی: ϝρόδον wródo-n) است.[۲][۳] ریشهٔ نهایی واژهٔ یونانی به صورت نیاهندواروپایی *wrdho- (حالت فونتیک: *wr̥dʰo-) بازسازی شده‌است.
        <br/>
        واژهٔ یونانی مذکور احتمالاً مستقیماً از نیاهندواروپایی نیست بلکه از طریق فارسی باستان *varda- وارد آن شده‌است.[۴] نظریهٔ دیگر این است که واژهٔ یونانی وام‌واژه‌ای از یک زبان تراسی-فریگی (و آن هم برگرفته از نیاهندواروپایی) است، چون رز علاوه بر ایران در مقدونیه و تراکیه نیز می‌روییده‌است.

        <br/><br/><b><li>تیره‌شناسی</li></b><br/>
        گل سرخ متعلق است به تیره‌ای از گیاهان به نام تیرهٔ گل‌سرخ، به غیر از گونه‌های گل سرخ، گیاهانی از قبیل توت فرنگی، تمشک، آلو، هلو و گیلاس نیز در این تیره جای می‌گیرند.
        <br/>
        گل‌های گیاهان تیره گل‌سرخ همه دارای پنج کاسبرگ و سیزده گلبرگ و پرچم‌های بسیار هستند. در مورد گل سرخ چون گونه‌های پیوندی و تربیت شده بر اثر پرورش حاصل شده‌اند، غالباً تعداد گلبرگ‌ها زیاد می‌شود.

        <br/><br/><b><li>ویژگی‌ها</li></b><br/>

        <ul>
            <li>
                برگ: به صورت شانه‌ای هستند. طول برگ از ۲٫۵ سانتیمتر در رز مینیاتور تا ۱۸ سانتیمتر در انواع ایستاده، درختچه و بالارونده تغییر دارد. حاشیه برگچه‌ها بیشتر، دندانه‌دار است. هر برگ معمولاً شامل ۵ تا ۷ و گاهی تعداد بیشتری برگچهٔ تخم مرغی یا بیضی شکل است. در قاعدهٔ برگ گوشوارک‌ها وجود دارد.
            </li>
            <li>
                خار: خار رز از نوع تیغ پوستی (پریکل)[پ ۱۵] است. این نوع خار منشأ اپیدرمی دارد و با بافت آوندی ارتباط ندارد به همین سبب به آسانی می‌توان آن را با فشار بیک سمت، جدا نمود.
            </li>
            <li>
                کاسبرگ: در مرحلهٔ غنچه از گلبرگ‌های به هم پیچیده محافظت می‌کنند اما ضمن رشد کردن گل، برمی‌گردند.
            </li>
            <li>
                برگ: به صورت شانه‌ای هستند. طول برگ از ۲٫۵ سانتیمتر در رز مینیاتور تا ۱۸ سانتیمتر در انواع ایستاده، درختچه و بالارونده تغییر دارد. حاشیه برگچه‌ها بیشتر، دندانه‌دار است. هر برگ معمولاً شامل ۵ تا ۷ و گاهی تعداد بیشتری برگچهٔ تخم مرغی یا بیضی شکل است. در قاعدهٔ برگ گوشوارک‌ها وجود دارد.
            </li>
        </ul>

        <a href="https://fa.wikipedia.org/wiki/%D8%B1%D8%B2" target={'_blank'}>{'لینک ویکی پدیا'}</a>
    </p>



    const maintenanceText = <p>
        <ul>
            <li>
                آب: هر 36 ساعت یک پیاله
            </li>
            <li>
                خاک: 90% خاک رس با 10% ماسه
            </li>
            <li>
                آب و هوا: نیمه مرطوب
            </li>
            <li>
                حساسیت ها: پشه ها - آفتاب مستقیم - گرما
            </li>
            <li>
                نحوه تکثیر: <a href="">قلمه زدن</a>
            </li>
        </ul>
    </p>


    const commentsText = [
        {
            name: 'مجتبی',
            date: '1401/4/10',
            profile: 'https://core.reply.ir/resource/user/2022/01/17/32/c2ee4787-537f-4673-87f0-b0a0bc9606e7?name=photo_2022-01-17_18-32-56.jpg',
            text: 'عالی بود',
        },
        {
            name: 'عباس',
            date: '1401/2/3',
            profile: 'https://core.reply.ir/resource/user/2022/05/25/502/e475bb24-cd11-476f-a2fa-fc22ff93415b?name=CC1FA507-BF95-4805-85EF-A83635F73B9C.jpeg',
            text: 'خوشم اومد',
        },
        {
            name: 'مینا',
            date: '1400/9/18',
            profile: 'https://core.reply.ir/resource/user/2022/05/08/123/46ddf8f7-4a5c-4201-80d7-974fc7bdcb87?name=Reply-File 2022-05-08 10_38_33.jpeg',
            text: 'امکان فروش هم داره؟',
        },
        {
            name: 'مریم',
            date: '1400/12/10',
            profile: 'https://core.reply.ir/resource/user/2022/01/17/89/5df90347-c0d8-4a5f-b879-9100b5854ab2?name=photo_2022-01-17_12-54-36.jpg',
            text: 'چه خوشگل!',
        },
    ]

    return (
        <div className={'plant'}>
            <div className={'more'}>
                <div className={'more__container'}>
                    <div className={'more__container2'}>
                        <i className="fa-solid fa-circle-chevron-down more__icon_1"/>
                        <i className="fa-solid fa-download more__icon_2"/>
                        <i className="fa-solid fa-share-nodes more__icon_3"/>
                        <i className="fa-regular fa-bookmark more__icon_4"/>
                        <i className="fa-regular fa-octagon-exclamation more__icon_5"/>
                    </div>
                </div>
            </div>
            <div>
                <div className="section-1">
                    <div className={'image'}>
                        <Image src={poster} alt={Plant} className={'image__poster'}/>
                        <div className="image__sliders">
                            <Image src={poster1} alt={Plant} onClick={() => setPoster(poster1)}
                                   className={`image__slide ${poster === poster1 ? 'image__slide-active' : ''}`}/>
                            <Image src={poster2} alt={Plant} onClick={() => setPoster(poster2)}
                                   className={`image__slide ${poster === poster2 ? 'image__slide-active' : ''}`}/>
                            <Image src={poster3} alt={Plant} onClick={() => setPoster(poster3)}
                                   className={`image__slide ${poster === poster3 ? 'image__slide-active' : ''}`}/>
                            <Image src={poster4} alt={Plant} onClick={() => setPoster(poster4)}
                                   className={`image__slide ${poster === poster4 ? 'image__slide-active' : ''}`}/>
                        </div>
                    </div>


                    <div className={'about'}>
                        <div className={'about__name'}>
                            <div className={'about__nickname'}>{'گل لاله ی رزبرقی'}</div>
                            <div>
                                <span className={'about__full-name'}>{'گل اله رزبرقی آفریقایی قرمز فلان '}</span>
                                <span className={"about__code"}>(کد 125)</span>
                            </div>
                        </div>

                        <div className={"about__label"}>
                            <div className={'about__label-item'} style={{background: '#2DBB31'}}>{'دارویی'}</div>
                        </div>

                        <div className="about__badge">
                            <i className="fa-solid fa-certificate"/>
                            <span className={'badge__title'}>{'بیشترین بازدید'}</span>
                        </div>

                        <div className="about__score">
                            <div className="about__score-global">
                                {initStars}
                            </div>
                            <div className={`about__score-local ${score ? 'about__score-local_selected' : ''}`}>
                                <i
                                    className={`fa-regular fa-face-smile about__score_icon_1 ${score === 1 ? 'about__score_icon-active' : ''}`}
                                    onClick={() => score === 1 ? setScore(false) : setScore(1)}/>
                                <i
                                    className={`fa-regular fa-face-meh about__score_icon_2 ${score === 2 ? 'about__score_icon-active' : ''}`}
                                    onClick={() => score === 2 ? setScore(false) : setScore(2)}/>
                                <i
                                    className={`fa-regular fa-face-frown about__score_icon_3 ${score === 3 ? 'about__score_icon-active' : ''}`}
                                    onClick={() => score === 3 ? setScore(false) : setScore(3)}/>
                            </div>
                        </div>
                    </div>


                    <div className="similar-plant">
                        <p className="similar-plant__title">{'گیاهان مرتبط'}</p>
                        {initSimilarPlant('گیاه ساکولنت تاپسی توروی', similarPlant1, 'جدید')}
                        {initSimilarPlant('گیاه کاکتوس کریسمس زرد', similarPlant2)}
                        {initSimilarPlant('گیاه آمریکایی دیش باغچه', similarPlant3)}
                        {initSimilarPlant('بورس گیاهی آمریکا', similarPlant4)}
                    </div>
                </div>


                <div className="section-2">
                    <div className="description">
                            <div className="description__title">
                            <span onClick={() => setDescriptionTab(DESCRIPTION.DESCRIPTION)}
                                  className={`description__title-item ${descriptionTab === DESCRIPTION.DESCRIPTION ?
                                      'description__title-item_active' : ''}`}>{' توضیحات '}</span>
                            <span onClick={() => setDescriptionTab(DESCRIPTION.MAINTENANCE)}
                                  className={`description__title-item ${descriptionTab === DESCRIPTION.MAINTENANCE ?
                                      'description__title-item_active' : ''}`}>{' شرایط نگهداری '}</span>
                            <span onClick={() => setDescriptionTab(DESCRIPTION.COMMENT)}
                                  className={`description__title-item ${descriptionTab === DESCRIPTION.COMMENT ?
                                      'description__title-item_active' : ''}`}>{' کامنت '}</span>
                        </div>
                        <div className="description__body">
                            {descriptionTab === DESCRIPTION.DESCRIPTION && descriptionText}
                            {descriptionTab === DESCRIPTION.MAINTENANCE && maintenanceText}
                            {descriptionTab === DESCRIPTION.COMMENT && commentsText.map(comment =>
                                <div className="description__comment">
                                    <span className={'description__comment-date'}>{comment.date}</span>
                                    <Image src={comment.profile} alt={comment.name} className={'description__comment-avatar'}/>
                                    <span className={'description__comment-name'}>{comment.name}</span>
                                    <pre className={'description__comment-text'}>{comment.text}</pre>
                                </div>)}
                        </div>
                    </div>
                </div>
                <br/><br/>
                <div className="similar-plant">
                    {initSimilarPlant('گیاه کاکتوس کریسمس زرد', similarPlant2)}
                    {initSimilarPlant('گیاه آمریکایی دیش باغچه', similarPlant3)}
                    {initSimilarPlant('گیاه ساکولنت تاپسی توروی', similarPlant1, 'جدید')}
                    {initSimilarPlant('بورس گیاهی آمریکا', similarPlant4)}
                </div>
            </div>
        </div>
    )
};
export default Plant;