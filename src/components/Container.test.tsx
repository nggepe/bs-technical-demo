import { render, screen } from '@testing-library/react';
import Container from './Container';

describe('Container component', () => {
  it('should render children correctly', () => {
    const childText = 'This is a child element';
    render(
      <Container>
        <p>{childText}</p>
      </Container>
    );

    const childElement = screen.getByText(childText);
    expect(childElement).toBeInTheDocument();
  });

  it('should have the correct class names', () => {
    const { container } = render(<Container><div></div></Container>);
    // The component renders a div, which is the first child of the container rendered by RTL
    const divElement = container.firstChild;
    expect(divElement).toHaveClass('container');
    expect(divElement).toHaveClass('mx-auto');
    expect(divElement).toHaveClass('flex');
    expect(divElement).toHaveClass('flex-col');
    expect(divElement).toHaveClass('bg-[#e0e7ff75]');
    expect(divElement).toHaveClass('min-h-screen');
  });
});
