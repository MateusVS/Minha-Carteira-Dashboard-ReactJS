import React from 'react';

import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';

import { Container, Content, Filters } from './styles';

const List: React.FC = () => {

    const months = [
        {value: 10, label: 'Outubro'},
        {value: 11, label: 'Novembro'},
        {value: 12, label: 'Dezembro'}
    ];

    const years = [
        {value: 2020, label: 2020},
        {value: 2021, label: 2021},
        {value: 2022, label: 2022},
    ]

    return (
        <Container>
            <ContentHeader title="Saídas" lineColor="#E44C4E">
                <SelectInput options={months} />
                <SelectInput options={years} />
            </ContentHeader>

            <Filters>
                <button type="button" className="tag-filter tag-filter-recurrent">
                    Recorrentes
                </button>
                <button type="button" className="tag-filter tag-filter-eventual">
                    Eventuais
                </button>
            </Filters>

            <Content>
                <HistoryFinanceCard tagColor="#E44C4E" title="Conta de Luz" subtitle="10/11/2020" amount="R$ 130,00" />
                <HistoryFinanceCard tagColor="#E44C4E" title="Conta de Luz" subtitle="10/11/2020" amount="R$ 130,00" />
                <HistoryFinanceCard tagColor="#E44C4E" title="Conta de Luz" subtitle="10/11/2020" amount="R$ 130,00" />
                <HistoryFinanceCard tagColor="#E44C4E" title="Conta de Luz" subtitle="10/11/2020" amount="R$ 130,00" />
                <HistoryFinanceCard tagColor="#E44C4E" title="Conta de Luz" subtitle="10/11/2020" amount="R$ 130,00" />
                <HistoryFinanceCard tagColor="#E44C4E" title="Conta de Luz" subtitle="10/11/2020" amount="R$ 130,00" />
                <HistoryFinanceCard tagColor="#E44C4E" title="Conta de Luz" subtitle="10/11/2020" amount="R$ 130,00" />
                <HistoryFinanceCard tagColor="#E44C4E" title="Conta de Luz" subtitle="10/11/2020" amount="R$ 130,00" />
                <HistoryFinanceCard tagColor="#E44C4E" title="Conta de Luz" subtitle="10/11/2020" amount="R$ 130,00" />
                <HistoryFinanceCard tagColor="#E44C4E" title="Conta de Luz" subtitle="10/11/2020" amount="R$ 130,00" />
            </Content>
        </Container>
    );
}

export default List;
