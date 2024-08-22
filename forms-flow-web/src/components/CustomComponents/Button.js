import React from "react";
import { useRef, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import {
  ChevronIcon,
  RefreshIcon,
  PreviewIcon,
  MessageIcon,
  SwitchIcon,
  AddIcon,
  DuplicateIcon,
  SaveTemplateIcon,
  CloseIcon,
  ExportIcon,
  ImportIcon,
  PencilIcon,
  CurlyBracketsIcon,
  AngleRightIcon,
  UploadIcon,
} from "@formsflow/components";

const CustomButton = ({
  variant,
  size,
  label,
  onClick,
  isDropdown,
  dropdownItems,
  disabled,
  icon,
  className,
  dataTestid,
  ariaLabel,
  iconColor,
  buttonLoading
}) => {
  const buttonRef = useRef(null);
  const toggleRef = useRef(null);
  // const testbuttonRef = useRef(null);
  // const [buttonWidth, setButtonWidth] = useState(null);
  const [menuStyle, setMenuStyle] = useState({});
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const updateMenuStyle = () => {
    if (buttonRef.current && toggleRef.current) {
      const buttonWidth = buttonRef.current.getBoundingClientRect().width;
      const toggleWidth = toggleRef.current.getBoundingClientRect().width;
      const totalWidth = buttonWidth + toggleWidth - 1;
      setMenuStyle({
        minWidth: `${totalWidth}px`,
        borderTop: "none",
        borderTopLeftRadius: "0",
        borderTopRightRadius: "0",
        padding: "0",
      });
    }
  };

  // const updateButtonStyle = () => {
  //   if (testbuttonRef.current) {
  //     const width = testbuttonRef.current.getBoundingClientRect().width;
  //     console.log(width);
  //     setButtonWidth(width);
  //   }
  // };


  // useEffect(() => {
  //   updateButtonStyle();
  // }, [buttonLoading]);

  useEffect(() => {
    updateMenuStyle();
    window.addEventListener("resize", updateMenuStyle);
    return () => window.removeEventListener("resize", updateMenuStyle);
  }, []);

  const iconMapping = {
    RefreshIcon: RefreshIcon,
    SwitchIcon: SwitchIcon,
    PreviewIcon: PreviewIcon,
    MessageIcon: MessageIcon,
    AddIcon: AddIcon,
    DuplicateIcon: DuplicateIcon,
    SaveTemplateIcon: SaveTemplateIcon,
    CloseIcon: CloseIcon,
    ExportIcon: ExportIcon,
    ImportIcon: ImportIcon,
    PencilIcon: PencilIcon,
    CurlyBracketsIcon: CurlyBracketsIcon,
    AngleRightIcon: AngleRightIcon,
    UploadIcon: UploadIcon,
  };

  const IconComponent = icon ? iconMapping[icon] : null;
  // const buttonStyle = buttonLoading ? { width: `${buttonWidth}px` } : {};

  if (isDropdown) {
    return (
      <Dropdown
        as={ButtonGroup}
        className={className}
        onToggle={(isOpen) => setDropdownOpen(isOpen)}
      >
        <Button
          variant={variant}
          size={size}
          disabled={disabled}
          ref={buttonRef}
          data-testid={dataTestid}
          aria-label={ariaLabel}
        >
          {label}
        </Button>

        <Dropdown.Toggle
          ref={toggleRef}
          split
          variant={variant}
          id="dropdown-split-basic"
          className={`default-arrow ${dropdownOpen ? "collapsed" : ""}`}
        >
          <ChevronIcon color="white" />
        </Dropdown.Toggle>

        <Dropdown.Menu style={menuStyle}>
          {dropdownItems.map((item, index) => (
            <Dropdown.Item
              key={index}
              onClick={item.onClick}
              data-testid={item.dataTestid}
              aria-label={item.ariaLabel}
            >
              {item.label}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    );
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={onClick}
      disabled={disabled || buttonLoading}
      className={className}
      data-testid={dataTestid}
      aria-label={ariaLabel}
      // ref={testbuttonRef}
      // style={buttonStyle}
    >
      {buttonLoading ? ( 
        <span className="dotted-spinner"></span>
      ) : (
        <>
          {IconComponent && (
            <span className="me-2">
              <IconComponent color={iconColor} />
            </span>
          )}
          {label}
        </>)}
    </Button>
  );
};

export default CustomButton;
