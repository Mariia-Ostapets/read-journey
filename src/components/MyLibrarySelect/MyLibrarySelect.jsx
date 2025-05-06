import { useEffect, useRef, useState } from 'react';
import css from './MyLibrarySelect.module.css';

const options = [
  { value: 'unread', label: 'Unread' },
  { value: 'in-progress', label: 'In progress' },
  { value: 'done', label: 'Done' },
  { value: 'all', label: 'All books' },
];

export default function MyLibrarySelect({ status, onChange }) {
  const [openSelector, setOpenSelector] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    options.find(option => option.value === status) || options[0]
  );

  const selectorRef = useRef(null);

  const toggleSelector = () => {
    setOpenSelector(prev => !prev);
  };

  const handleChange = option => {
    setSelectedOption(option);
    onChange(option);
    setOpenSelector(false);
  };

  useEffect(() => {
    const handleClickOutside = event => {
      if (selectorRef.current && !selectorRef.current.contains(event.target)) {
        setOpenSelector(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const defaultOption =
      options.find(option => option.value === status) || options[0];
    setSelectedOption(defaultOption);
  }, [status]);

  return (
    <div className={css.filterWrapper} ref={selectorRef}>
      <div className={css.filterContainer} onClick={toggleSelector}>
        <div>{selectedOption.label}</div>
        <svg width={16} height={16}>
          <use
            href={`/sprite.svg#${
              openSelector ? 'icon-chevron-up' : 'icon-chevron-down'
            }`}
          />
        </svg>
      </div>
      {openSelector && (
        <ul className={css.filterList}>
          {options.map(option => (
            <li
              className={css.filterItem}
              key={option.value}
              onClick={() => handleChange(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
