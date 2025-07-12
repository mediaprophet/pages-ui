import React from 'react';
import { SlideDown } from 'react-slidedown';
import { connect } from 'react-redux';

import 'react-slidedown/lib/slidedown.css'

import SidebarItem from './SidebarItem';
import './style.scss';

class Component extends React.Component {
    state = {
        isVisible: false,
        shouldExpand: false,
        shouldExpandNest: false,
        clickedMenu: null,
        clickedMenuNest: null,
        shouldSideBarPin: false,
        shouldToggleSidebarHeader: false,
        shouldBoxedLayout: false
    }
    componentDidMount() {

    }
    handleMouseEnter = () => {
        this.setState({
            isVisible: true
        })
    }
    handleMouseLeave = () => {
        this.setState({
            isVisible: false
        })
    }
    handleMenuExpan = (value) => {
        let customShouldExpan = true
        if (this.state.clickedMenu === value) {
            customShouldExpan = !this.state.shouldExpand
        }
        this.setState({
            shouldExpand: customShouldExpan,
            clickedMenu: value,
            clickedMenuNest: null
        })
    }
    handleMenuExpanNest = (value) => {
        this.setState({
            shouldExpandNest: !this.state.shouldExpandNest,
            clickedMenuNest: value
        })
    }
    togglePin = () => {
        this.setState({
            shouldSideBarPin: !this.state.shouldSideBarPin
        }, () => {
            if (this.state.shouldSideBarPin) {
                document.body.classList.add('menu-pin')
            } else {
                document.body.classList.remove('menu-pin')
            }
        })
    }
    toggleSidebarHeader = () => {
        this.setState({
            shouldToggleSidebarHeader: !this.state.shouldToggleSidebarHeader
        })
    }

    navBoxedLayout = () => {
        this.setState({
            shouldBoxedLayout: !this.state.shouldBoxedLayout
        }, () => {
            if (this.state.shouldBoxedLayout) {
                document.body.classList.add('box-layout menu-pin  mac desktop js-focus-visible')
            } else {
                document.body.classList.remove('box-layout menu-pin  mac desktop js-focus-visible')
            }
        })
    }

    render() {
        const { isVisible } = this.state
        // TODO if rtl is enabled this value should be a minus one
        const style = {
            transform: `translate3d(${isVisible ? 280 - 70 : 0}px, 0,0)`
        }

        let toggleHeader = this.state.shouldToggleSidebarHeader
            ? "sidebar-overlay-slide from-top show" : "sidebar-overlay-slide from-top"

        let shouldViewHeader = (
            window.location.pathname !== "/extra/404" &&
                window.location.pathname !== "/extra/500" &&
                window.location.pathname !== "/extra/login" &&
                window.location.pathname !== "/extra/register" &&
                window.location.pathname !== "/extra/lock_screen" ? true : false
        );

        let isBoxedLayout = window.location.pathname.includes("/boxed_layout") ? true : false;
        if (isBoxedLayout) {
            document.body.classList.remove('dashboard')
            document.body.classList.add('box-layout', 'menu-pin', 'mac', 'desktop', 'js-focus-visible')
        } else {
            document.body.classList.add('dashboard')
        }
        return (
            <nav style={shouldViewHeader ? style : { display: "none" }} className={`page-sidebar page-sidebar-corporate ${this.props.openState ? 'visible' : ''}`}
                data-pages="sidebar"
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}>
                {/* BEGIN SIDEBAR MENU TOP TRAY CONTENT*/}
                <div className={toggleHeader} id="appMenu">
                    <div className="row">
                        <div className="col-xs-6 no-padding">
                            <a href="#" className="p-l-40"><img src="/assets/img/demo/social_app.svg" alt="socail" />
                            </a>
                        </div>
                        <div className="col-xs-6 no-padding">
                            <a href="#" className="p-l-10"><img src="/assets/img/demo/email_app.svg" alt="socail" />
                            </a>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-6 m-t-20 no-padding">
                            <a href="#" className="p-l-40"><img src="/assets/img/demo/calendar_app.svg" alt="socail" />
                            </a>
                        </div>
                        <div className="col-xs-6 m-t-20 no-padding">
                            <a href="#" className="p-l-10"><img src="/assets/img/demo/add_more.svg" alt="socail" />
                            </a>
                        </div>
                    </div>
                </div>
                {/* END SIDEBAR MENU TOP TRAY CONTENT*/}
                {/* BEGIN SIDEBAR MENU HEADER*/}
                <div className="sidebar-header">
                    <img src="/assets/img/logo_white_2x.png" alt="logo"
                        style={this.props.openState ? { marginRight: '0px' } : {}}
                        className="brand" data-src="/assets/img/logo_2x.png" data-src-retina="/assets/img/logo_white_2x.png"
                        width="78" height="22" />
                </div>
                {/* END SIDEBAR MENU HEADER*/}
                {/* START SIDEBAR MENU */}
                <div className="sidebar-menu sidebar-menu-corporate">
                    {/* BEGIN SIDEBAR MENU ITEMS*/}
                    <div className="scroll-wrapper menu-items">
                        <ul className="menu-items scroll-content scroll-scrolly_visible">
                            <SidebarItem
                                url="/corporate"
                                title="Dashboard"
                                subTitle="12 New Updates"
                                icon={<i className="pg-icon">home</i>}
                                topMargin="m-t-20"
                            />
                            <SidebarItem
                                // url="/corporate/email"
								url="/corporate/#"
                                title="Email"
                                subTitle="234 New Emails"
                                icon={<i className="pg-icon">inbox</i>}
                            />
                            <SidebarItem
                                // url="/corporate/social"
								url="/corporate/#"
                                title="Social"
                                icon={<i className="pg-icon">social</i>}
                            />
                            <li className={(this.state.shouldExpand && this.state.clickedMenu === 'calendar') ? "open active" : ""}>
                                <a href=""
                                    onClick={(e) => {
                                        e.preventDefault()
                                        this.handleMenuExpan('calendar')
                                    }}
                                >
                                    <span className="title">Calendar</span>
                                    <span
                                        className={(this.state.shouldExpand && this.state.clickedMenu === 'calendar') ? "arrow open active" : " arrow"}
                                    ></span>
                                </a>
                                <span className="icon-thumbnail"><i className="pg-icon">calendar</i></span>
                                <SlideDown className={'my-dropdown-slidedown'} >
                                    {this.state.shouldExpand && this.state.clickedMenu === 'calendar' && (
                                        <ul className="sub-menu sub-menu-corporate">

                                            <SidebarItem
                                                // url="/corporate/calendar"
												url="/corporate/#"
                                                title="Basic"
                                                icon="c"
                                            />
                                            <SidebarItem
                                                // url="/corporate/calendar_lang"
												url="/corporate/#"
                                                title="Languages"
                                                icon="l"
                                            />
                                            <SidebarItem
                                                // url="/corporate/calendar_month"
												url="/corporate/#"
                                                title="Month"
                                                icon="m"
                                            />
                                            <SidebarItem
                                                // url="/corporate/calendar_lazy"
												url="/corporate/#"
                                                title="Lazy Load"
                                                icon="la"
                                            />
                                            <SidebarItem
                                                target="_blank"
                                                // url="/corporate/calendar_docs"
												url="/corporate/#"
                                                title="Documentation"
                                                icon="d"
                                            />
                                        </ul>
                                    )
                                    }
                                </SlideDown>
                            </li>
                            <SidebarItem
                                // url="/corporate/builder"
								url="/corporate/#"
                                title="Builder"
                                icon={<i className="pg-icon">brush</i>}
                            />
                            <li className={(this.state.shouldExpand && this.state.clickedMenu === 'layouts') ? "open active" : ""}>
                                <a href=""
                                    onClick={(e) => {
                                        e.preventDefault()
                                        this.handleMenuExpan('layouts')
                                    }}
                                >
                                    <span className="title">Layouts</span>
                                    <span
                                        className={(this.state.shouldExpand && this.state.clickedMenu === 'layouts') ? "arrow open active" : " arrow"}
                                    ></span>
                                </a>
                                <span className="icon-thumbnail"><i className="pg-icon">grid</i></span>
                                <SlideDown className={'my-dropdown-slidedown'}>
                                    {this.state.shouldExpand && this.state.clickedMenu === 'layouts' && (
                                        <ul className="sub-menu sub-menu-corporate">

                                            <SidebarItem
                                                // url="/corporate/default_layout"
												url="/corporate/#"
                                                title="Default"
                                                icon="dl"
                                            />
                                            <SidebarItem
                                                // url="/corporate/secondary_layout"
												url="/corporate/#"
                                                title="Secondary"
                                                icon="sl"
                                            />
                                            <SidebarItem
                                                // url="/corporate/boxed_layout"
												url="/corporate/#"
                                                title="Boxed"
                                                icon="bl"
                                            />
                                        </ul>
                                    )
                                    }
                                </SlideDown>
                            </li>
                            <li className={(this.state.shouldExpand && this.state.clickedMenu === 'UIelements') ? "open active" : ""}>
                                <a href=""
                                    onClick={(e) => {
                                        e.preventDefault()
                                        this.handleMenuExpan('UIelements')
                                    }}
                                >
                                    <span className="title">UI Elements</span>
                                    <span
                                        className={(this.state.shouldExpand && this.state.clickedMenu === 'UIelements') ? "arrow open active" : " arrow"}
                                    ></span>
                                </a>
                                <span className="icon-thumbnail"><i className="pg-icon">shapes</i></span>
                                <SlideDown className={'my-dropdown-slidedown'}>
                                    {this.state.shouldExpand && this.state.clickedMenu === 'UIelements' && (
                                        <ul className="sub-menu sub-menu-corporate">
                                            <SidebarItem
                                                // url="/corporate/color"
												url="/corporate/#"
                                                title="Color"
                                                icon="c"
                                            />
                                            <SidebarItem
                                                // url="/corporate/typography"
												url="/corporate/#"
                                                title="Typography"
                                                icon="t"
                                            />
                                            <SidebarItem
                                                // url="/corporate/icons"
												url="/corporate/#"
                                                title="Icons"
                                                icon="i"
                                            />
                                            <SidebarItem
                                                // url="/corporate/buttons"
												url="/corporate/#"
                                                title="Buttons"
                                                icon="b"
                                            />
                                            <SidebarItem
                                                // url="/corporate/notifications"
												url="/corporate/#"
                                                title="Notifications"
                                                icon="n"
                                            />
                                            <SidebarItem
                                                // url="/corporate/modals"
												url="/corporate/#"
                                                title="Modals"
                                                icon="m"
                                            />
                                            <SidebarItem
                                                // url="/corporate/progress"
												url="/corporate/#"
                                                title="Progress &amp; Activity"
                                                icon="pa"
                                            />
                                            <SidebarItem
                                                // url="/corporate/tabs_accordian"
												url="/corporate/#"
                                                title="Tabs &amp; Accordions"
                                                icon="ta"
                                            />
                                            <SidebarItem
                                                // url="/corporate/sliders"
												url="/corporate/#"
                                                title="Sliders"
                                                icon="s"
                                            />
                                            <SidebarItem
                                                // url="/corporate/tree_view"
												url="/corporate/#"
                                                title="Tree View"
                                                icon="tv"
                                            />
                                            <SidebarItem
                                                // url="/corporate/nestables"
												url="/corporate/#"
                                                title="Nestable"
                                                icon="ns"
                                            />
                                        </ul>
                                    )
                                    }
                                </SlideDown>
                            </li>
                            <li className={(this.state.shouldExpand && this.state.clickedMenu === 'Forms') ? "open active" : ""}>
                                <a href=""
                                    onClick={(e) => {
                                        e.preventDefault()
                                        this.handleMenuExpan('Forms')
                                    }}
                                >
                                    <span className="title">Forms</span>
                                    <span
                                        className={(this.state.shouldExpand && this.state.clickedMenu === 'Forms') ? "arrow open active" : " arrow"}
                                    ></span>
                                </a>
                                <span className="icon-thumbnail"><i className="pg-icon">note</i></span>
                                <SlideDown className={'my-dropdown-slidedown'}>
                                    {this.state.shouldExpand && this.state.clickedMenu === 'Forms' && (
                                        <ul className="sub-menu sub-menu-corporate">
                                            <SidebarItem
                                                // url="/corporate/form_elements"
												url="/corporate/#"
                                                title="Form Elements"
                                                icon="fe"
                                            />
                                            <SidebarItem
                                                // url="/corporate/form_layouts"
												url="/corporate/#"
                                                title="Form Layouts"
                                                icon="fl"
                                            />
                                            <SidebarItem
                                                // url="/corporate/form_wizard"
												url="/corporate/#"
                                                title="Form Wizard"
                                                icon="fw"
                                            />
                                        </ul>
                                    )
                                    }
                                </SlideDown>
                            </li>
                            <SidebarItem
                                // url="/corporate/cards"
								url="/corporate/#"
                                title="Cards"
                                icon={<i className="pg-icon">card</i>}
                            />
                            <SidebarItem
                                // url="/corporate/views"
								url="/corporate/#"
                                title="Views"
                                icon={<i className="pg-icon">layout</i>}
                            />
                            <li className={(this.state.shouldExpand && this.state.clickedMenu === 'Tables') ? "open active" : ""}>
                                <a href=""
                                    onClick={(e) => {
                                        e.preventDefault()
                                        this.handleMenuExpan('Tables')
                                    }}
                                >
                                    <span className="title">Tables</span>
                                    <span
                                        className={(this.state.shouldExpand && this.state.clickedMenu === 'Tabl1es') ? "arrow open active" : " arrow"}
                                    ></span>
                                </a>
                                <span className="icon-thumbnail"><i className="pg-icon">table</i></span>
                                <SlideDown className={'my-dropdown-slidedown'}>
                                    {this.state.shouldExpand && this.state.clickedMenu === 'Tables' && (
                                        <ul className="sub-menu sub-menu-corporate">
                                            <SidebarItem
                                                // url="/corporate/basic_tables"
												url="/corporate/#"
                                                title="Basic Tables"
                                                icon="bt"
                                            />
                                            <SidebarItem
                                                // url="/corporate/data_tables"
												url="/corporate/#"
                                                title="Data Tables"
                                                icon="dt"
                                            />
                                        </ul>
                                    )
                                    }
                                </SlideDown>
                            </li>
                            <li className={(this.state.shouldExpand && this.state.clickedMenu === 'Maps') ? "open active" : ""}>
                                <a href=""
                                    onClick={(e) => {
                                        e.preventDefault()
                                        this.handleMenuExpan('Maps')
                                    }}
                                >
                                    <span className="title">Maps</span>
                                    <span
                                        className={(this.state.shouldExpand && this.state.clickedMenu === 'Maps') ? "arrow open active" : " arrow"}
                                    ></span>
                                </a>
                                <span className="icon-thumbnail"><i className="pg-icon">map</i></span>
                                <SlideDown className={'my-dropdown-slidedown'}>
                                    {this.state.shouldExpand && this.state.clickedMenu === 'Maps' && (
                                        <ul className="sub-menu sub-menu-corporate">
                                            <SidebarItem
                                                // url="/corporate/google_map"
												url="/corporate/#"
                                                title="Google Maps"
                                                icon="gm"
                                            />
                                        </ul>
                                    )}
                                </SlideDown>
                            </li>
                            <SidebarItem
                                // url="/corporate/charts"
								url="/corporate/#"
                                title="Charts"
                                icon={<i className="pg-icon">chart</i>}
                            />
                            <li className={(this.state.shouldExpand && this.state.clickedMenu === 'Extra') ? "open active" : ""}>
                                <a href=""
                                    onClick={(e) => {
                                        e.preventDefault()
                                        this.handleMenuExpan('Extra')
                                    }}
                                >
                                    <span className="title">Extra</span>
                                    <span
                                        className={(this.state.shouldExpand && this.state.clickedMenu === 'Extra') ? "arrow open active" : " arrow"}
                                    ></span>
                                </a>
                                <span className="icon-thumbnail"><i className="pg-icon">effects</i></span>
                                <SlideDown className={'my-dropdown-slidedown'}>
                                    {this.state.shouldExpand && this.state.clickedMenu === 'Extra' && (
                                        <ul className="sub-menu sub-menu-corporate">
                                            <SidebarItem
                                                // url="/corporate/extra/invoice"
												url="/corporate/#"
                                                title="Invoice"
                                                icon="in"
                                            />
                                            <SidebarItem
                                                // url="/corporate/extra/404"
												url="/corporate/#"
                                                title="404 Page"
                                                icon="pg"
                                            />
                                            <SidebarItem
                                                // url="/corporate/extra/500"
												url="/corporate/#"
                                                title="500 Page"
                                                icon="pg"
                                            />
                                            <SidebarItem
                                                // url="/corporate/extra/blank_template"
												url="/corporate/#"
                                                title="Blank Page"
                                                icon="bp"
                                            />
                                            <SidebarItem
                                                // url="/corporate/extra/login"
												url="/corporate/#"
                                                title="Login"
                                                icon="l"
                                            />
                                            <SidebarItem
                                                // url="/corporate/extra/register"
												url="/corporate/#"
                                                title="Register"
                                                icon="re"
                                            />
                                            <SidebarItem
                                                // url="/corporate/extra/lock_screen"
												url="/corporate/#"
                                                title="Lockscreen"
                                                icon="ls"
                                            />
                                            <SidebarItem
                                                // url="/corporate/extra/gallery"
												url="/corporate/#"
                                                title="Gallery"
                                                icon="gl"
                                            />
                                            <SidebarItem
                                                // url="/corporate/extra/timeline"
												url="/corporate/#"
                                                title="Timeline"
                                                icon="t"
                                            />
                                        </ul>
                                    )
                                    }
                                </SlideDown>
                            </li>
                            <li className={(this.state.shouldExpand && this.state.clickedMenu === 'MenuLevels') ? "open active" : ""}>
                                <a href=""
                                    onClick={(e) => {
                                        e.preventDefault()
                                        this.handleMenuExpan('MenuLevels')
                                    }}
                                >
                                    <span className="title">Menu Levels</span>
                                    <span
                                        className={(this.state.shouldExpand && this.state.clickedMenu === 'MenuLevels') ? "arrow open active" : " arrow"}
                                    ></span>
                                </a>
                                <span className="icon-thumbnail"><i className="pg-icon">menu_level</i></span>
                                <SlideDown className={'my-dropdown-slidedown'}>

                                    {this.state.shouldExpand && this.state.clickedMenu === 'MenuLevels' && (
                                        <ul className="sub-menu sub-menu-corporate">
                                            <SidebarItem
                                                // url="/corporate/levelOne"
												url="/corporate/#"
                                                title="Level 1"
                                                icon="l1"
                                            />
                                            <li className={(this.state.shouldExpandNest && this.state.clickedMenu === 'MenuLevelsTwo') ? "open active" : ""}>
                                                <a href="#"
                                                    onClick={(e) => {
                                                        e.preventDefault()
                                                        this.handleMenuExpanNest('MenuLevelsTwo')
                                                    }}
                                                >
                                                    <span className="title">Level 2</span>
                                                    <span
                                                        className={(this.state.shouldExpandNest && this.state.clickedMenu === 'MenuLevels' && this.state.clickedMenuNest === 'MenuLevelsTwo') ? "arrow open active" : " arrow"}
                                                    ></span>
                                                </a>
                                                <span className="icon-thumbnail">L2</span>
                                                <SlideDown className={'my-dropdown-slidedown'}>
                                                    {this.state.shouldExpandNest && this.state.clickedMenuNest === 'MenuLevelsTwo' && (
                                                        <ul className="sub-menu sub-menu-corporate">
                                                            <SidebarItem
                                                                // url="/corporate/submenu"
																url="/corporate/#"
                                                                title="Sub Menu"
                                                                icon="sm"
                                                            />
                                                            <SidebarItem
                                                                // url="/corporate/submenu"
																url="/corporate/#"
                                                                title="Sub Menu"
                                                                icon="sm"
                                                            />
                                                        </ul>
                                                    )
                                                    }
                                                </SlideDown>
                                            </li>
                                        </ul>
                                    )
                                    }

                                </SlideDown>
                            </li>
                            <li className="">
                                <a 
                                    href="https://docs.pages.revox.io/" 
                                    rel="noreferrer" 
                                    target="_blank"
                                >
                                <span className="title">Docs</span></a>
                                <span className="icon-thumbnail"><i className="pg-icon">flag</i></span>
                            </li>
                            <li className="m-b-40">
                                <a 
                                    href="http://changelog.pages.revox.io/" 
                                    rel="noreferrer" 
                                    target="_blank"
                                >
                                <span className="title">Changelog</span></a>
                                <span className="icon-thumbnail"><i className="pg-icon">clipboard</i></span>
                            </li> 
                            
                        </ul>
                        <a 
                            href="#" 
							className="search-link d-flex justify-content-between align-items-center d-lg-none" 
							data-toggle="horizontal-menu"
							id="headerSearchInput"
						>
							Tap here to search 
							<i className="pg-icon float-right">search</i>
						</a>
                    </div>
                    <div className="clearfix"></div>
                </div>
            </nav >
        );
    }
}

// export default Component;

const mapStateToProps = state => {
    return {
        openState: state.QuickView.openMobileSideBar
    }
}
const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Component);