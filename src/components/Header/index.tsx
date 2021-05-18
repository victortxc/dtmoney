import logoImg from '../../assets/logo.svg';
import { Container, Content } from './styles';
import Modal from 'react-modal';

Modal.setAppElement('#root')

interface HeaderProps {
    onOpenNewTransactionModal: () => void
}

export function Header({onOpenNewTransactionModal}: HeaderProps) {
    return (
        <Container>
            <Content>
                <img src={logoImg} alt="dt money" />
                <button type="button" onClick={onOpenNewTransactionModal}>Nova Transacão</button>
            </Content>
        </Container>
    );
}