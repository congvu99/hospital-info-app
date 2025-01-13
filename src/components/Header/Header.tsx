import React from 'react';
import './Header.styles.ts';
import { useNavigate } from 'react-router-dom';
import { Menu, MenuItem, MenuSelectEvent } from '@progress/kendo-react-layout';

const Header: React.FC = () => {
    const navigate = useNavigate();
    const onSelect = (event: MenuSelectEvent) => {
        navigate(event.item.data.route);
    };
  return (
      <header className="container-fluid">
          <Menu onSelect={onSelect}>
              <MenuItem text="Home" data={{ route: '' }} />
              <MenuItem text="Patient Information" data={{ route: '/patient-information' }} />
              <MenuItem text="About" data={{ route: '/about' }}>
                  <MenuItem text="Team" data={{ route: '/about/team' }} />
              </MenuItem>
          </Menu>
      </header>
  );
};

export default Header;
