import React, { useState } from 'react';

import { MdDashboard, MdArrowDownward, MdArrowUpward, MdExitToApp, MdClose, MdMenu,  } from 'react-icons/md';

import logoImg from '../../assets/logo.svg';

import { useAuth } from '../../hooks/auth';

import { Container, Header, LogoImg, Title, MenuContainer, MenuItemLink, MenuItemButton, ToggleMenu } from './styles';

const Aside: React.FC = () => {
    const [ toggleMenuIsOpened, setToggleMenuIsOpened ] = useState();
    const { SignOut } = useAuth();

    const handleToggleMenu = () => {
        setToggleMenuIsOpened(!toggleMenuIsOpened);
    }

    return (
        <Container menuIsOpen={toggleMenuIsOpened}>
            <Header>
                <ToggleMenu onClick={handleToggleMenu}>
                    { toggleMenuIsOpened ? <MdClose /> : <MdMenu />}
                </ToggleMenu>
                <LogoImg src={logoImg} alt="Logo Minha Carteira" />
                <Title>Minha Carteira</Title>
            </Header>

            <MenuContainer>
                <MenuItemLink href="/">
                    <MdDashboard />
                    Dashboard
                </MenuItemLink>

                <MenuItemLink href="/list/entry-balance">
                    <MdArrowUpward />
                    Entradas
                </MenuItemLink>

                <MenuItemLink href="/list/exit-balance">
                    <MdArrowDownward />
                    Saídas
                </MenuItemLink>

                <MenuItemButton onClick={SignOut}>
                    <MdExitToApp />
                    Sair
                </MenuItemButton>
            </MenuContainer>
        </Container>
    );
}

export default Aside;
