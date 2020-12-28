import React, { useState, useMemo } from 'react';

import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import WalletBox from '../../components/WalletBox/index';

import gains from '../../repositories/gains';
import expenses from '../../repositories/expenses';
import listOfMonths from '../../utils/months';

import { Container, Content } from './styles';

const Dashboard: React.FC = () => {
    const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth() + 1);
    const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear());

    const options = [
        {'value': 'Mateus', 'label': 'Mateus'},
        {'value': 'Maria', 'label': 'Maria'},
        {'value': 'Ana', 'label': 'Ana'}
    ];

    const years = useMemo(() => {
        let uniqueYears:number[] = [];

        [...expenses, ...gains].forEach(item => {
            const data = new Date(item.date);
            const year = data.getFullYear();

            if (!uniqueYears.includes(year)) {
                uniqueYears.push(year);
            }
        });

        return uniqueYears.map(year => {
            return {
                value: year,
                label: year
            };
        });

    },[]);

    const months = useMemo(() => {
        return listOfMonths.map((month, index) => {
            return {
                value: index + 1,
                label: month
            }
        });
    },[]);

    const handleMonthSelected = (month: string) => {
        try {
            const parseMonth = Number(month);
            setMonthSelected(parseMonth);
        } catch (error) {
            throw new Error('Invalid month value. Is a accept 0 - 24.');
        }
    }

    const handleYearSelected = (year: string) => {
        try {
            const parseYear = Number(year);
            setYearSelected(parseYear);
        } catch (error) {
            throw new Error('Invalid year value. Is accept integer numbers.');
        }
    }

    return (
        <Container>
            <ContentHeader title="Dashboard" lineColor="#F7931B">
            <SelectInput options={months} onChange={(e) => handleMonthSelected(e.target.value)} defaultValue={monthSelected} />
            <SelectInput options={years} onChange={(e) => handleYearSelected(e.target.value)} defaultValue={yearSelected} />
            </ContentHeader>

            <Content>
                <WalletBox title="saldo" color="#4E41F0" amount={150.00} footer="atualizado com base nas entradas e saidas" icon="dolar" />
                <WalletBox title="entradas" color="#F7931B" amount={5000.00} footer="atualizado com base nas entradas e saidas" icon="arrowUp" />
                <WalletBox title="saídas" color="#E44C4E" amount={4850.00} footer="atualizado com base nas entradas e saidas" icon="arrowDown" />
            </Content>
        </Container>
    );
}

export default Dashboard;
