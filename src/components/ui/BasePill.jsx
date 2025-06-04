//botoes de adjetivos
export default function PillButton({
  role,
  children,
  className = "",
  ...rest
}) {
  //…rest – gathers all other props (onClick, disabled, etc.) into an object. role decides color preset
  const styles = {
    //Creates a local lookup table that maps each role
    primary: "bg-blue-700 text-white",
    secondary: "bg-violet-600 text-white",
    none: "bg-white text-neutral-800 hover:bg-neutral-100",
  };
  return (
    <button
      className={`px-3 py-1 rounded-md text-sm font-medium border transition ${styles[role]} ${className}`}
      {...rest} //Prop-spreading – forwards every extra prop (e.g., onClick, disabled, type="submit"), keeping the component flexible.
    >
      {children}{" "}
      {/*Renders the actual label/icon(s) given between the component tags. */}
    </button>
  );
}
