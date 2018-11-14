import * as React from "react";

export default class Home extends React.Component {

    render() {
        return (
            <div className="body">
                <div className="banner">
                    <div className="quoteEen"><h2>Random quote 1</h2></div>
                    <div className="logo"><img src="http://www.tabletopgameshop.co.uk/media/com_easysocial/photos/42/51/mtg-logo-700x560_thumbnail.png"/></div>
                    <div className="quoteTwee"><h2>Random quote 2</h2></div>
                </div>
                <div className="accordion">
                    <ul>
                        <li>
                            <div>
                                <a href="#" className="sliderLink">
                                <h2 className="TitleCard">White</h2>
                                </a>
                            </div>
                        </li>
                        <li>
                            <div>
                                <a href="#" className="sliderLink">
                                <h2 className="TitleCard">Green</h2>
                                </a>
                            </div>
                        </li>
                        <li>
                            <div>
                                <a href="#" className="sliderLink">
                                <h2 className="TitleCard">Black</h2>
                                </a>
                            </div>
                        </li>
                        <li>
                            <div>
                                <a href="#" className="sliderLink">
                                <h2 className="TitleCard">Blue</h2>
                                </a>
                            </div>
                        </li>
                        <li>
                            <div>
                                <a href="#" className="sliderLink">
                                <h2 className="TitleCard">Red</h2>
                                </a>
                            </div>
                        </li>
                        <li>
                            <div>
                                <a href="#" className="sliderLink">
                                <h2 className="TitleCard">Colorless</h2>
                                </a>
                            </div>
                        </li>
                    </ul>
                </div>
          </div>  
        )
    }
}