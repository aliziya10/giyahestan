import './createPlant.scss';
import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';


const CreatePlant = props => {


    const maintenanceListData = [
        {
            enable: false,
            text: '',
            type: 'آب'
        }, {
            enable: false,
            text: '',
            type: 'خاک'
        }, {
            enable: false,
            text: '',
            type: 'آب و هوا'
        }, {
            enable: false,
            text: '',
            type: 'حساسیت ها'
        },
    ]

    const tagsList = [
        {
            id: 1,
            name: 'دارویی',
            color: '#2dbb31'
        },
        {
            id: 2,
            name: 'آپارتمانی',
            color: '#cf9710'
        },
        {
            id: 3,
            name: 'میوه ای',
            color: '#e77016'
        }
    ]

    const reproduceList = [
        'هیچکدام',
        'قلمه زدن',
        'پیوند زدن',
        'خوابانیدن',
        'پاجوش',
    ]

    const inputFileRef = useRef(null)
    const inputPostRef = useRef(null)
    const linkFileRef = useRef(null)

    const [name, setName] = useState('')
    const [fullName, setFullName] = useState('')
    const [description, setDescription] = useState('')
    const [descriptionViki, setDescriptionViki] = useState('')
    const [tags, setTags] = useState([])
    const [poster, setPoster] = useState(false)
    const [posterLink, setPosterLink] = useState('')
    const [images, setImages] = useState([])
    const [imageLink, setImageLink] = useState('')

    const [maintenanceList, setMaintenanceList] = useState([...maintenanceListData])

    const [openBoxTags, setOpenBoxTags] = useState(false)
    const [dropDoneReproduce, setDropDoneReproduce] = useState(false)

    const [selectReproduce, setSelectReproduce] = useState(reproduceList[0])

    const editMaintenance = (e, index, type) => {
        const maintenance = maintenanceList;
        if (type === 'button')
            maintenance[index].enable = !maintenance[index].enable;
        else if (type === 'input')
            maintenance[index].text = e.target.value;
        setMaintenanceList([...maintenance]);
    }

    const setLinkImage = (e, filed, type) => {
        if (type === 'poster' && (filed === 'button' || e.code === 'Enter')) {
            setPoster(posterLink)
            setPosterLink('')
        } else if (type === 'image' && (filed === 'button' || e.code === 'Enter')) {
            e.preventDefault();
            setImages([...images, imageLink])
            setImageLink('')
        }
    }

    const errorImage = type => {
        props.alert({type: 'err', message: 'تصویر انتخاب شده مشکل دارد.'})
        if (type === 'poster')
            setPoster(false)
        else if (type === 'image')
            setImages(images.pop())
    }

    const validationLink = link => {
        let url;
        try {
            url = new URL(link);
        } catch (_) {
            return false;
        }

        return url.protocol === "http:" || url.protocol === "https:";
    }


    const showPreviewPlant = e => {
        e.preventDefault();


        const maintenanceServer = []
        for(let i in [0, 1, 2, 3])
            maintenanceList[i].enable && maintenanceList[i].text.length ?
                maintenanceServer.push(maintenanceList[i].text) : maintenanceServer.push(null)

        const formData = new FormData();

        formData.append('short_name', name.trim());
        formData.append('tags', '[]');
        formData.append('title', fullName.trim());
        formData.append('des', description.trim());
        formData.append('WPlink', descriptionViki.trim());
        formData.append('poster', poster);
        formData.append('image1', images[0] || null);
        formData.append('image2', images[1] || null);
        formData.append('image3', images[2] || null);
        formData.append('maintenance', JSON.stringify(maintenanceServer));
        formData.append('reproduce', 2);


        if (name.length && fullName.length && description.length && images) {
            axios.post('http://127.0.0.1:8000/plants/createplant/', formData)
            alert('نمایش اولیه ی گیاه')
            // send to server
        } else {
            if (!name.length)
                props.alert({type: 'err', message: 'فیلد نام خالی است'})
            else if (!fullName.length)
                props.alert({type: 'err', message: 'فیلد نام کامل خالی است'})
            else if (!description.length)
                props.alert({type: 'err', message: 'فیلد توضیحات خالی است'})
            else if (!poster)
                props.alert({type: 'err', message: 'پوستر برای گیاه درج نشده است'})

            /*
            let message = 'خطا:\n\n'
            message += name.length ? '' : '- فیلد نام خالی است\n'
            message += fullName.length ? '' : '- فیلد نام کامل خالی است\n'
            message += description.length ? '' : '- فیلد توضیحات خالی است\n'
            message += name.length ? '' : '- تصویری برای گیاه درج نشده'
            alert(message)
             */
        }
    }

    const initTagBox = props => {
        return <>
            <i className={`fa-regular fa-plus tag__add-icon 
                ${tagsList.length === tags.length ? 'tag__add-icon_disable' : openBoxTags ? 'tag__add-icon_turn' : ''}`}
               onClick={() => setOpenBoxTags(!openBoxTags)}/>

            <div className="tag__selected-box">
                {tags.map(tag =>
                    <span style={{background: tag.color}} className={'tag__selected'}
                          onClick={() => setTags(tags.filter(x => x.id !== tag.id))}>
                        <span className={'tag__name-selected'}>{tag.name}</span>
                        <i className="fa-regular fa-xmark tag__close-selected"/>
                    </span>
                )}
            </div>

            {tagsList.length > tags.length &&
            <div style={{display: openBoxTags ? 'block' : 'none'}} className={'tag__unselect-box'}>
                {tagsList.map(tag => {
                    if (tags.find(x => x.id === tag.id))
                        return null
                    return <div style={{background: tag.color}} onClick={() => setTags([...tags, tag])}
                                className={'tag__unselect'}>{tag.name}</div>
                })}
            </div>
            }
        </>
    }

    const initMaintenance = (props, index) => {
        return <div className={'maintenance__item-box'}>
            <label className="maintenance__item-checkbox">
                <input checked={props.enable} type="checkbox" onClick={e => editMaintenance(e, index, 'button')}/>
                <div className="maintenance__checkmark"/>
            </label>
            <span>{props.type}</span>
            <input type={'text'} value={props.text} onChange={e => editMaintenance(e, index, 'input')}
                   className={`maintenance__item-input ${props.enable ? '' : 'maintenance__item-input-hidden'}`}/>
        </div>
    }

    return <div className="create-plant">
        <h2 className={'title'}>{'ایجاد گیاه جدید در سایت'}</h2>
        <div className={'required-arm'}>{'* یعنی اجباری'}</div>
        <form className={'form'}>
            <span className={'name filed-text'}>
                <input required value={name} className={'name__input'} onChange={e => setName(e.target.value)}/>
                <label className={'name__label'}>{'* نام کوتاه'}</label>
            </span>
            <div className={'tag'}>
                <div className={'tag__label'}><label>{'برچسب ها'}</label></div>
                <div className={'tag__box'} onBlur={() => setOpenBoxTags(false)} tabIndex={0}>{initTagBox()}</div>
            </div>
            <div className={'full-name filed-text'}>
                <input required value={fullName} onChange={e => setFullName(e.target.value)}/>
                <label>{'* نام کامل'}</label>
            </div>
            <div className={'description'}>
                <div className={'filed-text'}>
                    <textarea required value={description} onChange={e => setDescription(e.target.value)}/>
                    <label>{'* توضیحات'}</label>
                </div>
                <div className={'description__viki'}>
                    <span>{'لینک ویکی پدیا'}</span>
                    <input required value={descriptionViki} type="url" dir={'ltr'}
                           onChange={e => setDescriptionViki(e.target.value)}/>
                    <i className="fa-solid fa-check"/>
                </div>
            </div>
            <div className={'images'}>
                <label className={'image__label'}>{'*پوستر'}</label>
                <input type={'file'} hidden ref={inputPostRef}
                       accept={"image/png, image/jpeg"} onChange={e => setPoster(e.target.files[0])}/>
                <div className={'images__boxes'}>
                    {!!poster && <span>
                        <i className="fa-regular fa-xmark image__close" onClick={() => setPoster(false)}/>
                        <img src={typeof poster === 'object' ?  URL.createObjectURL(poster) : poster}
                             alt={'poster'} className={'image-item'} onError={e => errorImage('poster')}/>
                    </span>}

                    {!poster && <div className={'image__add'} onClick={() => inputPostRef.current.click()}>
                        <i className="fa-thin fa-circle-plus"/>
                        <span className={`image__add-box ${validationLink(posterLink) ? 'mage__add-box_valid' : ''}`}
                              onClick={e => e.stopPropagation()}>
                            <input required type={"url"} dir={'ltr'} onChange={e => setPosterLink(e.target.value)}
                                   value={posterLink} onKeyDown={e => setLinkImage(e, 'input', 'poster')}/>
                            <i className={'fa-solid fa-check'} onClick={e => setLinkImage(e, 'button', 'poster')}/>
                        </span>
                    </div>}
                </div>
            </div>
            <div className={'images'}>
                <label className={'image__label'}>{'تصویر'}</label>
                <input type={'file'} hidden ref={inputFileRef}
                       accept="image/png, image/jpeg" onChange={e => setImages([...images, e.target.files[0]])}/>
                <div className={'images__boxes'}>
                    {images.map((image, index) => <span>
                        <i className="fa-regular fa-xmark image__close"
                           onClick={() => setImages(images.filter((img, ind) => ind !== index))}/>
                        <img src={typeof image === 'object' ? URL.createObjectURL(image) : image}
                             alt={`image-${index}`} className={'image-item'} onError={e => errorImage('image')}/>
                    </span>)}

                    {images.length < 3 &&
                    <div className={'image__add'} onClick={() => inputFileRef.current.click()}>
                        <i className="fa-thin fa-circle-plus"/>
                        <span className={`image__add-box ${validationLink(imageLink) ? 'mage__add-box_valid' : ''}`}
                              onClick={e => e.stopPropagation()}>
                            <input required type={"url"} dir={'ltr'} onChange={e => setImageLink(e.target.value)}
                                   value={imageLink} onKeyDown={e => setLinkImage(e, 'input', 'image')}/>
                            <i className={'fa-solid fa-check'} onClick={e => setLinkImage(e, 'button', 'image')}/>
                        </span>
                    </div>}
                </div>
            </div>
            <div className={'maintenance'}>
                <label className={'maintenance__label'}>{'شرایط نگهداری'}</label>
                <div className={'maintenance__box'}>
                    {maintenanceList.map(initMaintenance)}
                    <hr/>
                    <div className={'maintenance__item-box'}>
                        <span className={'maintenance__reproduce-label'}>{'نحوه تکثیر'}</span>

                        <span onClick={() => setDropDoneReproduce(!dropDoneReproduce)} tabIndex={0}
                              className={'maintenance__reproduce'} onBlur={() => setDropDoneReproduce(false)}>
                            <div className={'maintenance__reproduce-select'}>{selectReproduce}</div>
                            {dropDoneReproduce && <>
                                <div className={'maintenance__reproduce-box'}>
                                    {reproduceList.map(item => item === selectReproduce ? null :
                                        <div onClick={() => setSelectReproduce(item)}>{item}</div>)
                                    }
                                </div>
                            </>}
                        </span>
                    </div>
                </div>
            </div>

            <input className={'send-plant'} type={'submit'}
                   onClick={showPreviewPlant} value={'ساخت گیاه'}/>
        </form>
    </div>
}
export default CreatePlant;