import * as React from "react";
import BasicComponent from "src/types/basicComponent";

export default class Products extends BasicComponent {

    render() {
        return (
                <div className="detail">
                    <img className="cardImage" src="https://img.scryfall.com/cards/large/en/soi/49b.jpg?1518204227"/>
                    <div className="details">
                        <h2>Perfected Form</h2>
                        <h3>Creature: Human Insect</h3>
                        <h3>Prijs: €0,45</h3>
                        <button>Add to cart</button>
                    </div>
                    <div className="detailsText">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam feugiat imperdiet leo, sit amet aliquet eros lacinia consequat. Proin eleifend lorem id mi finibus imperdiet. Vivamus magna justo, ullamcorper vitae imperdiet luctus, vestibulum congue leo. Maecenas lobortis ut nibh vel efficitur. Pellentesque varius sagittis mollis. Nullam sit amet augue bibendum, volutpat justo vitae, dapibus risus. Morbi dignissim elementum diam, eget malesuada ante pulvinar quis. Morbi ipsum dolor, rutrum mattis consequat et, lacinia eu velit. Duis faucibus suscipit velit a lacinia. Aliquam ultricies ante vitae iaculis pellentesque. Suspendisse vulputate condimentum dictum.
Nunc volutpat, sapien at scelerisque finibus, libero tortor porta enim, in suscipit quam quam id felis. Nullam scelerisque, orci accumsan fringilla lacinia, purus turpis accumsan libero, at mollis lorem libero quis ipsum. Mauris vel velit eleifend, consectetur mauris non, ultrices sapien. Sed vitae diam ligula. Nullam vel vehicula orci. Curabitur sed sem tortor. Nunc eget metus nisi.
                    </div>
                </div>
               )
        }
    }