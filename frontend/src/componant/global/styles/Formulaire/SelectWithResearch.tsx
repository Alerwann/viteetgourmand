/** @format */

import Select, { type Props as SelectProps } from 'react-select';

interface OptionType {
  value: string | number;
  label: string;
}

interface SelectWithResearchProps extends Omit<
  SelectProps<OptionType, false>,
  'value' | 'onChange'
> {
  label: string;
  id: string;
  name?: string;
  options: OptionType[];
  value?: string | number;
  // On accepte soit une fonction avec un événement synthétique, soit une valeur directe
  onChange: (e: { target: { name: string; value: string | number } }) => void;
  defaultOptionText?: string;
}

export function SelectWithResearch({
  label,
  id,
  name,
  options,
  value,
  onChange,
  defaultOptionText = '-- Sélectionner --',
  ...props
}: SelectWithResearchProps) {
  const selectedOption = options.find((opt) => opt.value === value) || null;

  return (
    <div className="contents">
      <label
        htmlFor={id}
        className="text-xl font-medium text-[#2C2C2C] font-sans text-center"
      >
        {label}
      </label>
      <Select
        inputId={id}
        name={name}
        value={selectedOption}
        onChange={(option) => {
          const selected = option as OptionType | null;
          onChange({
            target: {
              name: name || id,
              value: selected ? selected.value : '',
            },
          });
        }}
        options={options}
        placeholder={defaultOptionText}
        noOptionsMessage={() => 'Aucun résultat'}
        classNamePrefix="react-select"
        styles={{
          control: (provided, state) => ({
            ...provided,
            backgroundColor: '#FDFBF7',
            borderColor: state.isFocused ? '#D95D39' : '#EFECE6',
            borderWidth: '1px',
            borderRadius: '0.75rem',
            padding: '0.35rem',
            boxShadow: state.isFocused ? '0 0 0 1px #D95D39' : 'none',
            maxWidth: '60vh',
            '&:hover': {
              borderColor: '#D95D39',
            },
          }),
          menu: (provided) => ({
            ...provided,
            backgroundColor: '#FDFBF7',
            borderRadius: '0.75rem',
            overflow: 'hidden',
          }),
          option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected
              ? '#D95D39'
              : state.isFocused
                ? '#F2EDE4'
                : '#FDFBF7',
            color: state.isSelected ? '#FFFFFF' : '#2C2C2C',
            textAlign: 'center',
            cursor: 'pointer',
          }),
          singleValue: (provided) => ({
            ...provided,
            color: '#2C2C2C',
            textAlign: 'center',
          }),
          placeholder: (provided) => ({
            ...provided,
            color: '#9CA3AF',
            textAlign: 'center',
          }),
        }}
        {...props}
      />
    </div>
  );
}
