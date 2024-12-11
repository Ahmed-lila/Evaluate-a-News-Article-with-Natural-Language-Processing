import { handleSubmit } from '../formHandler';

// Mock fetch
global.fetch = jest.fn(() =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ 
            text: 'sample text',
            score_tag: 'P+',
            agreement: 'AGREEMENT',
            subjectivity: 'SUBJECTIVE',
            confidence: '100',
            irony: 'NONIRONIC'
        })
    })
);

test('handleSubmit should call fetch and update DOM elements', async () => {
    document.body.innerHTML = `
        <form id="form">
            <input type="text" id="article-url" value="https://www.example.com"/>
        </form>
        <div id="text"></div>
        <div id="agreement"></div>
        <div id="subjectivity"></div>
        <div id="confidence"></div>
        <div id="irony"></div>
        <div id="score_tag"></div>
    `;

    const event = new Event('submit');
    document.getElementById('form').addEventListener('submit', handleSubmit);
    document.getElementById('form').dispatchEvent(event);

    // Wait for DOM updates
    await new Promise(process.nextTick);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(document.getElementById('text').innerHTML).toBe('Text: sample text');
    expect(document.getElementById('agreement').innerHTML).toBe('Agreement: AGREEMENT');
    expect(document.getElementById('subjectivity').innerHTML).toBe('Subjectivity: SUBJECTIVE');
    expect(document.getElementById('confidence').innerHTML).toBe('Confidence: 100');
    expect(document.getElementById('irony').innerHTML).toBe('Irony: NONIRONIC');
    expect(document.getElementById('score_tag').innerHTML).toBe('Score Tag: P+');
});
