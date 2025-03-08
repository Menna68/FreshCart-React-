import { useContext } from "react";
import { wishListContext } from "../../Context/WishList.context";

export default function WishListItem({ productinfo }) {
  let { price, title, category, imageCover, id } = productinfo;
  let { removeProductWishLish } = useContext(wishListContext);
  return (
    <>
      <table className="w-full  bg-white    bg-opacity-40 shadow-md shadow-red-200    rounded-2xl  ">
        <tr className="  flex flex-col md:flex-row md:justify-between justify-center  items-center rounded-2xl content-center border border-red-100 ">
          <td className="p-3">
            <img src={imageCover} alt="" className="w-24 h-24 rounded-full" />
          </td>
          <td className="p-4 ">
            <h2 className="text-xl text-center text-gray-700  font-semibold w-[200px] line-clamp-2">
              {title}
            </h2>
          </td>
          <td>
            <h3 className="text-xl d  text-gray-500 font-semibold">
              {category.name}
            </h3>
          </td>

          <td className="p-4">
            <p className="text-black  ">
              {" "}
              <span className="text-black  mr-1">price:</span>
              {price}
            </p>
          </td>
          <td className="p-4">
            <button
              className=" text-gray-800  hover:text-red-600 transition-colors"
              onClick={() => {
                removeProductWishLish({ id });
              }}
            >
              <i className="fa-regular fa-trash-can text-xl "></i>
            </button>
          </td>
        </tr>
      </table>
    </>
  );
}
