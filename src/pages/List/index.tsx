import React, { useMemo, useState, useEffect, useContext } from 'react';
import { uuid } from 'uuidv4';

import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';

import gains from '../../repositories/gains';
import expenses from '../../repositories/expenses';
import formatCurrency from '../../utils/formatCurrency';
import formatDate from '../../utils/formatDate';
import listOfMonths from '../../utils/months';

import { Container, Content, Filters } from './styles';
import { ThemeContext } from 'styled-components';

interface IRouteParams {
    match: {
        params: {
            type: string;
        }
    }
}

interface IData {
    id: string;
    description: string;
    amountFormatted: string;
    frequency: string;
    dateFormatted: string;
    tagColor: string;
}

const List: React.FC<IRouteParams> = ({ match }): JSX.Element => {
    const { colors } = useContext(ThemeContext);
    const [data, setData] = useState<IData[]>([]);
    const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth() + 1);
    const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear());
    const [frequencyFilterSelected, setFrequencyFilterSelected] = useState(['recorrente', 'eventual']);

    const movimentType = match.params.type;

    const pageData = useMemo(() => {
        return movimentType === 'entry-balance'
            ?
            {
                title: 'Entradas',
                lineColor: colors.success,
                data: gains
            }
            :
            {
                title: 'Saídas',
                lineColor: colors.warning,
                data: expenses
            }
    }, [colors.success, colors.warning, movimentType]);

    const years = useMemo(() => {
        let uniqueYears:number[] = [];

        const { data } = pageData;

        data.forEach(item => {
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

    },[pageData]);

    const months = useMemo(() => {
        return listOfMonths.map((month, index) => {
            return {
                value: index + 1,
                label: month
            }
        });
    },[]);

    const handleFrequencyClick = (Frequency: string) => {
        const alreadySelected = frequencyFilterSelected.findIndex(item => item === Frequency);

        if (alreadySelected >= 0) {
            const filtered = frequencyFilterSelected.filter(item => item !== Frequency);
            setFrequencyFilterSelected(filtered);
        } else {
            setFrequencyFilterSelected((prev) => [...prev, Frequency]);
        }
    }

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

    useEffect(() => {
        const { data } = pageData;

        const filteredDate = data.filter(item => {
            const date = new Date(item.date);
            const month = date.getMonth() + 1;
            const year = date.getFullYear();

            return month === monthSelected && year === yearSelected && frequencyFilterSelected.includes(item.frequency);
        });

        const formattedDate = filteredDate.map(item => {
            return {
                id: uuid(),
                description: item.description,
                amountFormatted: formatCurrency(Number(item.amount)),
                frequency: item.frequency,
                dateFormatted: formatDate(item.date),
                tagColor: item.frequency === 'recorrente' ? colors.success : colors.warning,
            }
        });
        setData(formattedDate);
    },[pageData, monthSelected, yearSelected, data.length, frequencyFilterSelected, colors.success, colors.warning]);

    return (
        <Container>
            <ContentHeader title={pageData.title} lineColor={pageData.lineColor}>
                <SelectInput options={months} onChange={(e) => handleMonthSelected(e.target.value)} defaultValue={monthSelected} />
                <SelectInput options={years} onChange={(e) => handleYearSelected(e.target.value)} defaultValue={yearSelected} />
            </ContentHeader>

            <Filters>
                <button type="button" className={`tag-filter tag-filter-recurrent ${frequencyFilterSelected.includes('recorrente') && 'tag-actived'}`} onClick={() => handleFrequencyClick('recorrente')}>
                    Recorrentes
                </button>
                <button type="button" className={`tag-filter tag-filter-eventual ${frequencyFilterSelected.includes('eventual') && 'tag-actived'}`} onClick={() => handleFrequencyClick('eventual')}>
                    Eventuais
                </button>
            </Filters>

            <Content>
                {
                   data.map(item => (
                        <HistoryFinanceCard key={item.id} tagColor={item.tagColor} title={item.description} subtitle={item.dateFormatted} amount={item.amountFormatted} />
                   ))
                }
            </Content>
        </Container>
    );
}

export default List;
