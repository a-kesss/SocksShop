import img1 from '../../../Socksstyles/рис1.png';
import img2 from '../../../Socksstyles/рис2.png';
import img3 from '../../../Socksstyles/рис3.png';
import img4 from '../../../Socksstyles/рис4.png';

export default function Image({ image, width, height }) {
  switch (image) {
    case 1:
      return (
        <img
          className="my_image1"
          height={height * 0.25}
          src={img1}
        ></img>
      );
    case 2:
      return (
        <img
          className="my_image2"
          height={height * 0.23}
          src={img2}
        ></img>
      );

    case 3:
      return (
        <img
          className="my_image3"
          height={height * 0.25}
          src={img3}
        ></img>
      );

    case 4:
      return (
        <img
          className="my_image4"
          height={height * 0.25}
          src={img4}
        ></img>
      );
  }
}
