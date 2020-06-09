import { isTransformCard, nextInArray } from "./utils";
import { getImgBytes } from "../Gateway/http";

class CardClassScrapthis {

  constructor(cardDetails) {
    this.cardDetails = cardDetails;
    this.cmc = cardDetails.cmc;
    this.colours = cardDetails.colors;
    this.type_line = cardDetails.type_line;
    this.imgUri = cardDetails.image_uris && cardDetails.image_uris.small;

    this.isTransformCard = isTransformCard(cardDetails);
    if (this.isTransformCard) {
      this.cardFaces = cardDetails.card_faces
      this.cardFaces.forEach(cardFace => {
        cardFace.imgUri = cardFace.image_uris.small;
        // cardFace.imgBytes = getImgBytes(this.imgSrc).then((bytes) => "data:image/png;base64," + bytes);
      })
      this.cardFace = cardDetails.card_faces[0];
      this.cardDetails = Object.assign(this.cardDetails, this.cardFace);
    }

    // if (!this.isTransformCard) {
    //   this.imgUri = cardDetails.image_uris && cardDetails.image_uris.small;
      // this.imgBytes = getImgBytes(this.imgSrc).then((bytes) => "data:image/png;base64," + bytes);
    // }

  }

  transform = () => {
    if (this.isTransformCard) {
      this.cardFace = nextInArray(this.cardFaces);
      this.cardDetails = Object.assign(this.cardDetails, this.cardFace);
    }
  }


}

export default CardClassScrapthis;