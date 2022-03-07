import * as React from 'react';
import SelectUnstyled, {
  SelectUnstyledProps,
  selectUnstyledClasses,
} from '@mui/base/SelectUnstyled';
import OptionUnstyled, { optionUnstyledClasses } from '@mui/base/OptionUnstyled';
import { styled } from '@mui/system';
import { PopperUnstyled } from '@mui/base';

const StyledButton = styled('button')`
  font-family: IBM Plex Sans, sans-serif;
  font-size: 20px;
  font-weight: bold;
  width: 100%;
  min-height: calc(1.5em + 22px);
  background: #fff;
  border: 1px solid #1a2b44;
  border-radius: 5px;
  padding: 0 20px;
  text-align: left;
  line-height: 1.5;
  color: #fff;
  background-color: #1a2b44;

  &.${selectUnstyledClasses.focusVisible} {
    outline: 4px solid rgba(100, 100, 100, 0.3);
  }

  &.${selectUnstyledClasses.expanded} {
    border-radius: 5px 5px 0 0;

    &::after {
      content: '▴';
    }
  }

  &::after {
    content: '▾';
    float: right;
  }

  & img {
    margin-right: 10px;
  }
`;

const StyledListbox = styled('ul')`
  font-family: IBM Plex Sans, sans-serif;
  width: 100% !important;
  min-width: 150px;
  padding: 0;
  margin: 0;
  border: 1px solid #1a2b44;
  border-top: none;
  max-height: 400px;
  overflow: auto;
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  background-color: #1a2b44;
  border-radius: 0 0 5px 5px;
`;

const StyledOption = styled(OptionUnstyled)`
  list-style: none;
  padding: 5px 20px;
  margin: 0;
  border-bottom: 1px solid #1a2b44;
  cursor: default;
  width: 100%;

  &:last-of-type {
    border-bottom: none;
  }

  &.${optionUnstyledClasses.disabled} {
    color: #888;
  }

  &.${optionUnstyledClasses.selected} {
    background-color: rgba(25, 118, 210, 0.08);
  }

  &.${optionUnstyledClasses.highlighted} {
    background-color: #16d;
    color: #fff;
  }

  &.${optionUnstyledClasses.highlighted}.${optionUnstyledClasses.selected} {
    background-color: #05e;
    color: #fff;
  }

  &:hover:not(.${optionUnstyledClasses.disabled}) {
    background-color: #39e;
  }

  & img {
    margin-right: 10px;
  }
`;

const StyledPopper = styled(PopperUnstyled)`
  z-index: 1;
`;

const CustomSelect = React.forwardRef(function CustomSelect(
  props: SelectUnstyledProps<number>,
  ref: React.ForwardedRef<any>,
) {
  const components: SelectUnstyledProps<number>['components'] = {
    Root: StyledButton,
    Listbox: StyledListbox,
    Popper: StyledPopper,
    ...props.components,
  };

  return <SelectUnstyled {...props} ref={ref} components={components} />;
});


export default function UnstyledSelectRichOptions(props: any) {

  const handleChange = (value: SelectChangeEvent) => {
    props.setNetwork(value)
  };

  return (
    <CustomSelect 
      value={props.value}
      onChange={handleChange} >
      {countries.map((c) => (
        <StyledOption key={c.code} value={c.code}>
          <img
            loading="lazy"
            width="30"
            height="30"
            src={`assets/icons/bridge/${c.label}.png`}
            alt={c.label}
          />
          {c.label}
        </StyledOption>
      ))}
    </CustomSelect>
  );
}

const countries = [
  { code: '250', label: 'Fantom'},
  { code: '43114', label: 'Avalanche'},
  { code: '56', label: 'BSC'},
  { code: '122', label: 'Fuse'},
  { code: '1', label: 'Ethereum'},
  { code: '1285', label: 'Moonriver'},
  { code: '137', label: 'Polygon'},
]