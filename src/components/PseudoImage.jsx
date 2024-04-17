import PropTypes from "prop-types";

const PseudoImage = ({ firstLetter }) => {
  return (
    <div className="flex w-fit items-center justify-center rounded-[50%] border border-custom-text bg-custom-secondary/40 px-2">
      <span className="font-bold text-custom-text">{firstLetter}</span>
    </div>
  );
};
PseudoImage.propTypes = {
  firstLetter: PropTypes.string,
};
export default PseudoImage;
