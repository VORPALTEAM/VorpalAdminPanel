import { menuStyles, tabs } from 'config';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DispatchData } from 'state/hooks';
import { RootState, actions } from 'state/reducer';
import { keyItem, keyList, menu, menuItem, subMenuItem } from 'types';

const MenuEditor = () => {

    const State = useSelector((state: RootState) => {
        return state
     })
    const dispatch = useDispatch()
    const defaultItem : menuItem = {
        name: "",
        url: "",
        style: "default",
        submenu: []
    }
    const defaultSubItem : subMenuItem = {
        name: "",
        url: ""
    }
    const [isDataloaded, markLoading] = useState(false)
    const [selectedTabIndex, selectTabForEdit] = useState<number>(0)
    const [menu, updateMenu] = useState<menu>([])
    const [newItem, updateNewItem] = useState<menuItem>(defaultItem)
    const [newSubItem, updateNewSubItem] = useState<subMenuItem>(defaultSubItem)


    const menuItems = () => {
          let menue : menu = []
          State.keys.forEach((elm : keyItem) => {
              if (elm._key === tabs.menu) {
                 try {
                    const parsed = JSON.parse(elm.value)
                    menue = parsed
                 } catch (e) {
                    console.log(e)
                 }
              }
          })
        return menue
    }

    useEffect(() => {
        if (!isDataloaded) {
            updateMenu(menuItems)
            markLoading(true)
        }
    })

    const UpdateMenuValue = (event) => {
        const val = event.target.value 
        const elem : number = event.target.dataset.index 
        const field = event.target.dataset.var 
        const updMenu : menu = []
        menu.forEach((item : menuItem, ind : number) => {
            if (Number(ind) === Number(elem)) {
                if (field === "name") {
                    updMenu.push({
                        name : val,
                        url : item.url,
                        style : item.style,
                        submenu : item.submenu
                    })
                }
                if (field === "url") {
                    updMenu.push({
                        name : item.name,
                        url : val,
                        style : item.style,
                        submenu : item.submenu
                    })
                }
                if (field === "style") {
                    updMenu.push({
                        name : item.name,
                        url : item.url,
                        style : val,
                        submenu : item.submenu
                    })
                }
            } else {
                updMenu.push(item)
            }
        })
        updateMenu(updMenu)
    }

    const UpdateCreationSubItem = (event) => {
        const field = event.target.dataset.var
        const newVal = event.target.value 
        let updItem : subMenuItem = defaultSubItem
        if (field === "name") {
            updItem = {
                name: newVal,
                url: newSubItem.url
            }
        }
        if (field === "url") {
            updItem = {
                name: newSubItem.name,
                url: newVal
            }
        }
        updateNewSubItem(updItem)
    }

    const AppendMenuSubItem = (event) => {
        if (newSubItem.name === defaultSubItem.name)  {
            return;
        }
        const elem : number = event.target.dataset.index 
        const val = event.target.value 
        const field = event.target.dataset.var 
        const updMenu : menu = []
        menu.forEach((item : menuItem, ind : number) => {
            if (Number(ind) !== Number(elem)) {
                updMenu.push(item)
            } else {
              const newSubMenu : subMenuItem[] = item.submenu
              newSubMenu.push(newSubItem)
              updMenu.push({
                 name: item.name,
                 url: item.url,
                 style: item.style,
                 submenu: newSubMenu
              })
            }
        })
        updateMenu(updMenu)
        updateNewSubItem(defaultSubItem)
    }

    const UpdateSubMenuValue = (event) => {
        const val = event.target.value 
        const elem : number = event.target.dataset.index 
        const subelem : number = event.target.dataset.subindex 
        const field = event.target.dataset.var 
        const updMenu : menu = []
        menu.forEach((item : menuItem, ind : number) => {
            if (Number(ind) !== Number(elem)) {
                updMenu.push(item)
            } else {
                const newSubMenu : subMenuItem[] = []
                item.submenu.forEach((subitem : subMenuItem, subind: number) => {
                    if (Number(subind) !== Number(subelem)) {
                        newSubMenu.push(subitem)
                    } else {
                        const newItem : subMenuItem = (field === "name") ? {
                            name: val,
                            url: subitem.url
                        } : {
                            name: subitem.name,
                            url: val
                        }
                        newSubMenu.push(newItem)
                    }
                })
                updMenu.push({
                    name: item.name,
                    url: item.url,
                    style: item.style,
                    submenu: newSubMenu
                })
            }
        })
        updateMenu(updMenu)
    }

    const DeleteSubMenuItem = (event) => {
        const elem : number = event.target.dataset.index 
        const subelem : number = event.target.dataset.subindex 
        const updMenu : menu = []
        menu.forEach((item : menuItem, ind : number) => {
            if (Number(ind) !== Number(elem)) {
                updMenu.push(item)
            } else {
                const newSubMenu : subMenuItem[] = []
                item.submenu.forEach((subitem : subMenuItem, subind: number) => {
                    if (Number(subind) !== Number(subelem)) {
                        newSubMenu.push(subitem)
                    } 
                })
                updMenu.push({
                    name: item.name,
                    url: item.url,
                    style: item.style,
                    submenu: newSubMenu
                })
            }
        })
        updateMenu(updMenu)
    }

    const UpdateCreationItem = (event) => {
        const field = event.target.dataset.var
        const newVal = event.target.value 
        let updItem : menuItem = defaultItem
        if (field === "name") {
            updItem = {
                name: newVal,
                url: newItem.url,
                style: newItem.style,
                submenu: []
            }
        }
        if (field === "url") {
            updItem = {
                name: newItem.name,
                url: newVal,
                style: newItem.style,
                submenu: []
            }
        }
        if (field === "style") {
            updItem = {
                name: newItem.name,
                url: newItem.url,
                style: newVal,
                submenu: []
            }
        }
        updateNewItem(updItem)
    }

    const AppendMenuItem = () => {
        if (newItem.name === defaultItem.name) {
            return;
        }
        const newManue = menu
        newManue.push(newItem)
        updateNewItem(defaultItem)
    }

    const SwitchActiveTab = (event) => {
        const activeIndex : number = Number(event.target.dataset.index) 
        selectTabForEdit(activeIndex)
    }

    const DeleteMenuItem = (event) => {
        const updMenu : menu = []
        const elem : number = event.target.dataset.index 
        menu.forEach((item : menuItem, ind : number) => {
            if (Number(ind) !== Number(elem)) {
                updMenu.push(item)
            }
        })
        updateMenu(updMenu)
    }

    const SaveData = () => {
        const currentData : keyList = []
        State.keys.forEach((item: keyItem) => {
            if (item._key !== "menu") {
                currentData.push(item)
            } else {
                currentData.push({
                    _key: "menu",
                    value: JSON.stringify(menu)
                })
            }
        })
        dispatch(actions.keys(currentData))
        DispatchData(currentData, State.deletions)
    }

    return(
        <div className="menu--editor">
            <div className="menu--editor--inner">
                {menu.map((item, index) => {
                    return(
                        <div key={`mn${index * 5}`} className="single--menu--edit">
                            <div className="txt--edit">
                                <input type="text" data-index={index} data-var="name" 
                                value={item.name} onChange={UpdateMenuValue} />
                            </div>
                            <div className="txt--edit row--item">
                                <input type="text" data-index={index} data-var="url" 
                                value={item.url} onChange={UpdateMenuValue} />
                            </div>
                            <div className="txt--edit row--item">
                                <select data-index={index} data-var="style" onChange={UpdateMenuValue}>
                                     <option value={menuStyles.default} 
                                     selected={item.style === menuStyles.default ? true : false}>{menuStyles.default}</option>
                                     <option value={menuStyles.sale} 
                                     selected={item.style === menuStyles.sale ? true : false}>{menuStyles.sale}</option>
                                     <option value={menuStyles.starmap} 
                                     selected={item.style === menuStyles.starmap ? true : false}>{menuStyles.starmap}</option>
                                </select>
                            </div>
                            <div className="txt--edit row--item del--key--btn">
                                <img src="images/minus.png" data-index={index} onClick={DeleteMenuItem} />
                            </div>
                            <div className="txt--edit row--item del--key--btn submenu--burger">
                                <img src={selectedTabIndex === index ? "images/b_active.png" : "images/burger.png" } 
                                data-index={index}
                                onClick={SwitchActiveTab} />
                            </div>
                            <div className={`submenu--edit--container${selectedTabIndex === index ? " ctnr--active" : ""}`}>
                                <div className="subitem--add--row" style={{
                                    position: 'absolute',
                                    marginTop: -60 * index,
                                    marginLeft: 20
                                }}>
                                    {item.submenu.map((subitem, s_index) => {
                                           return(
                                            <div  className="single--menu--edit">
                                              <div className="txt--edit">
                                                <input type="text" 
                                                data-index={index} 
                                                data-subindex={s_index}
                                                data-var="name" 
                                                 value={subitem.name} onChange={UpdateSubMenuValue} />
                                              </div>
                                              <div className="txt--edit row--item">
                                                <input type="text" 
                                                  data-index={index} 
                                                  data-subindex={s_index}
                                                  data-var="url" 
                                                  value={subitem.url} onChange={UpdateSubMenuValue} />
                                              </div>
                                              <div className="txt--edit row--item del--key--btn">
                                                 <img src="images/minus.png" 
                                                 data-index={index} 
                                                 data-subindex={s_index}
                                                 onClick={DeleteSubMenuItem} />
                                              </div>
                                            </div>
                                           )
                                    })}
                                    <div className="single--menu--edit menu--item--add--row">
                                      <div className="txt--edit">
                                          <input type="text" data-var="name" 
                                            placeholder="name"
                                            data-index={index}
                                            value = {newSubItem.name}
                                            onChange={UpdateCreationSubItem}
                                           />
                                      </div>
                                      <div className="txt--edit row--item">
                                          <input type="text" 
                                            data-var="url" 
                                            data-index={index}
                                            placeholder="url"
                                            value = {newSubItem.url}
                                            onChange={UpdateCreationSubItem}
                                          />
                                      </div>
                                      <div className="row--item" >
                                          <img src="images/plus.png" 
                                          data-index={index}
                                          onClick={AppendMenuSubItem}
                                          />
                                      </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
                <div className="single--menu--edit menu--item--add--row">
                    <div className="txt--edit">
                                <input type="text" data-var="name" 
                                placeholder="name"
                                value = {newItem.name}
                                onChange={UpdateCreationItem}
                                />
                    </div>
                    <div className="txt--edit row--item">
                                <input type="text" data-var="url" 
                                placeholder="url"
                                value = {newItem.url}
                                onChange={UpdateCreationItem}
                                />
                    </div>
                    <div className="txt--edit row--item">
                            <select data-var="style" onChange={UpdateCreationItem}>
                                 <option value={menuStyles.default}
                                   selected={newItem.style === menuStyles.default ? true : false}>{menuStyles.default}</option>
                                 <option value={menuStyles.sale} 
                                 selected={newItem.style === menuStyles.sale ? true : false}>{menuStyles.sale}</option>
                                 <option value={menuStyles.starmap}
                                 selected={newItem.style === menuStyles.starmap ? true : false}>{menuStyles.starmap}</option>
                            </select>
                    </div>
                    <div className="row--item" onClick={AppendMenuItem}>
                        <img src="images/plus.png" />
                    </div>
                </div>
                <div className="save--data--row">
                  <button className="save--btn save--keys--btn" onClick={SaveData}>
                     Save
                  </button>
                </div>
            </div>
        </div>
    )
}

export default MenuEditor