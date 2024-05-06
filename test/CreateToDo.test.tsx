import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import CreateTodo from '../src/Todo';

const renderComponent = () => {
    return render(<CreateTodo />);
}

describe('Testing Create ToDo Component', () => {
    it('check if Button is present and disabled', async () => {
        renderComponent();
        const btnEl = await screen.findByRole('button', {name: /Add todo/i});
        expect(btnEl).toBeInTheDocument();
        expect(btnEl).toBeDisabled();
    });

    it('check the input functionality of input field', async () => {
        const mockData = "Add to List";
        renderComponent();
        const inputEl = await screen.findByTestId('input') as HTMLInputElement;
        fireEvent.change(inputEl, {target: {value: mockData}});
        expect(inputEl.value).toEqual(mockData);

        const btnEl = await screen.findByRole('button', {name: /Add todo/i})
        expect(btnEl).toBeInTheDocument();
        expect(btnEl).not.toBeDisabled();
    });

    it('check if expected items is added to list', async () => {
        const mockData = "item 1";
        const mockData2 = "item 2";
        renderComponent();

        const inputEl = await screen.findByTestId('input') as HTMLInputElement;
        //item 1 to be added
        fireEvent.change(inputEl, { target: { value: mockData }});
        expect(inputEl.value).toEqual(mockData);

        const btnEl = await screen.findByRole('button', {name: /Add todo/i});

        expect(btnEl).toBeInTheDocument();
        expect(btnEl).not.toBeDisabled();
        fireEvent.click(btnEl);
        //item 2 to be added
        fireEvent.change(inputEl, { target: { value: mockData2 }});
        expect(inputEl.value).toEqual(mockData2);
        fireEvent.click(btnEl);

        const list = await screen.findAllByRole('listitem');
        expect(list[0].textContent).toEqual(mockData);
        expect(list[1].textContent).toEqual(mockData2);
    });

    it('check if update functionality in todo works properly', async () => {
        renderComponent();
        const checkboxEl = await screen.findAllByTestId('checkbox');
        expect(checkboxEl[0]).not.toBeChecked();
        fireEvent.click(checkboxEl[0]);
        expect(checkboxEl[0]).toBeChecked();
    });

    it('check the filter functionality', async () => {
        renderComponent();
        const filterEl = await screen.findByTestId('select');
        fireEvent.change(filterEl, { target: { value: 'Active' }});

        const list = await screen.findAllByRole('listitem');
        expect(list.length).toBe(1);

        fireEvent.change(filterEl, { target: { value: 'All' }});
        const listAll = await screen.findAllByRole('listitem');
        expect(listAll.length).toBe(2);

        fireEvent.change(filterEl, { target: { value: 'Completed' }});
        const listcompleted = await screen.findAllByRole('listitem');
        expect(listcompleted.length).toBe(1);
    });
})