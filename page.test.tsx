import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import Page from './Page';
import expect from 'expect';

describe('Page component rendering', () => {
  beforeEach(() => {
    render(<Page />);
  });

  it('renders all headings correctly', () => {
    const headings_first = screen.queryAllByRole('heading', { level: 1 });
    const headings_second = screen.getAllByRole('heading', { level: 2 });
    const headings_third = screen.getAllByRole('heading', { level: 3 });
    const headings_fourth = screen.getAllByRole('heading', { level: 4 });

    expect(headings_first.length).toBe(0);

    [headings_second, headings_third, headings_fourth].forEach(headings => {
      headings.forEach((heading) => {
        expect(heading).toBeInTheDocument();
        expect(heading).toHaveTextContent(/.+/);
        expect(heading).toBeVisible();
      });
    });

  });

  it('button works correctly', () => {

    const buttons = screen.queryAllByText('Mehr erfahren');

    fireEvent.click(buttons[0]);
    expect(screen.getByText('Some text')).toBeInTheDocument();

    fireEvent.click(buttons[0]);
    expect(screen.getByText('Some text')).not.toBeInTheDocument();

    fireEvent.click(buttons[1]);
    expect(screen.getByText('Some text')).toBeInTheDocument();

    fireEvent.click(buttons[1]);
    expect(screen.getByText('Some text')).not.toBeInTheDocument();

  });

  it('Form buttons works correctly', () => {

    const buttons = screen.getAllByText(/^(Anlieferung anfragen|Neue Anfrage)/);

    buttons.forEach((button) => {
      fireEvent.click(button);
    });

    expect(buttons.length).toBeGreaterThan(0);

  });

  it('Heading text accurate', () => {

    const main_title = screen.getByRole('heading', {
      level: 2,
    });

    expect(main_title).toHaveTextContent('FensterPass');

  });

  it('Headings of blocks', () => {

    const recycle_block = screen.queryByText('Recycling');
    expect(recycle_block).toBeInTheDocument();

    const block = screen.queryByText('Wohin mit dem alten Fenster?');
    expect(block).toBeInTheDocument();

    const contact_block = screen.queryByText('Kontaktinformationen');
    expect(contact_block).toBeInTheDocument();

    const information_block = screen.queryByText('Informationen zum Fensterprofil');
    expect(information_block).toBeInTheDocument();

  });

  it('Links renders correctly', () => {

    const links = screen.getAllByRole('link', {
      name: /^(Datenschutz|Impressum)/
    });

    const reg_url = /^(https:\/\/www.digitalbuilding.solutions\/datenschutz\/|https:\/\/www.digitalbuilding.solutions\/impressum\/)/;

    links.forEach((link) => {
      expect(link).toHaveAttribute('href', expect.stringMatching(reg_url));
    });

  });

  it('Count of "read more" buttons', () => {

    const buttons = screen.getAllByText('Mehr erfahren');
    expect(buttons.length).toBe(2);

  });

  it('Count of big blue buttons', () => {

    const buttons = screen.getAllByText(/^(Anlieferung anfragen|Neue Anfrage)/);
    expect(buttons.length).toBe(2);

  });

  it('Count of main blocks', () => {

    const main = screen.getByRole('main');
    expect(main.children.length).toBe(4);

  });

  it('renders all paragraphs correctly', () => {

    const paragraphs = screen.getAllByRole('paragraph');
    expect(paragraphs.length).toBeGreaterThan(0);
    paragraphs.forEach((paragraph) => {
      expect(paragraph).toHaveTextContent(/.+/);
      expect(paragraph).toBeVisible();
    });

  });
});
