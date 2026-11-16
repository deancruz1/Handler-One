// A row of mutually exclusive buttons. `options` is a list of [value, label].
function Segmented({ value, options, onChange, disabled = false }) {
  return (
    <div className="seg">
      {options.map(([v, label]) => (
        <button
          key={v}
          type="button"
          aria-pressed={v === value}
          disabled={disabled}
          onClick={() => onChange(v)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export default Segmented;
