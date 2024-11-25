import __authors from "./users.json";
import avatar1 from "../../../../public/Image-1.png";
import avatar2 from "../../../../public/Image-2.png";
import avatar3 from "../../../../public/Image-3.png";
import avatar4 from "../../../../public/Image-4.png";
import avatar5 from "../../../../public/Image-5.png";
import avatar6 from "../../../../public/Image-6.png";
import avatar7 from "../../../../public/Image-7.png";
import avatar8 from "../../../../public/Image-8.png";
import avatar9 from "../../../../public/Image-9.png";
import avatar10 from "../../../../public/Image-10.png";

const imgs = [
  avatar1,
  avatar2,
  avatar3,
  avatar4,
  avatar5,
  avatar6,
  avatar7,
  avatar8,
  avatar9,
  avatar10,
];

const DEMO_AUTHORS = __authors.map((item, index) => ({
  ...item,
  avatar: imgs[index] || item.avatar,
}));

export { DEMO_AUTHORS };
