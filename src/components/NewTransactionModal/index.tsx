import Modal from 'react-modal';
import { Container, TransactionTypeContainer, RadioBox } from './styles';
import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import { FormEvent, useState } from 'react';
import { useTransactions } from '../../hooks/useTransactions';

interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewTransactionModal({isOpen, onRequestClose}: NewTransactionModalProps){
    const {createTransaction} = useTransactions();

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState(0);
    const [type, setType] = useState('deposit');

    async function handleCreateNewTransaction(event: FormEvent) {
        event.preventDefault();
        await createTransaction({
            title,
            amount,
            category,
            type
        }).then(() => {
            setTitle('');
            setAmount(0);
            setCategory('');
            setType('deposit');
            onRequestClose();
        });
    }

    return(
        <Modal
        isOpen={isOpen} 
        onRequestClose={onRequestClose}
        overlayClassName="react-modal-overley"
        className="react-modal-content"
        >
        <button type="button" className="react-modal-close">
            <img src={closeImg} alt="Fechar modal" onClick={onRequestClose} />
        </button>

        <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar transacão</h2>

        <input
         placeholder="Título" 
         value={title} 
         onChange={event => setTitle(event.target.value)} />

        <input
         placeholder="Valor" type="number"
         value={amount} 
         onChange={event => setAmount(Number(event.target.value))}
        />

        <TransactionTypeContainer>
            <RadioBox
             isActive={type === 'deposity'} 
             activeColor="green" 
             type="button" 
             onClick={() => {setType('deposity')}}>
                <img src={incomeImg} alt="Entrada" />
                <span>Entrada</span>
            </RadioBox>

            <RadioBox
             isActive={type === 'withdraw'} 
             activeColor="red" type="button" 
             onClick={() => {setType('withdraw')}}>
                <img src={outcomeImg} alt="Saida" />
                <span>Saída</span>
            </RadioBox>
        </TransactionTypeContainer>

        <input 
        placeholder="Categoria" 
        value={category} 
        onChange={event => setCategory(event.target.value)}
        />
        <button type="submit">Cadastrar</button>
        </Container>
      </Modal>
    );
}