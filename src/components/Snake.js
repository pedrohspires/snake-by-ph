function Snake({position}) {
  return (
    <div style={position} className={`w-5 h-5 bg-white absolute z-10`}></div>
  );
}

export default Snake;
