import { useState } from 'react';

function Form() {

  const [status, setStatus] = useState('typing');
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(null);
 
  if (status === 'success') {
    return <h1>That's right!</h1>
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('submitting');
    try {
      await submitForm(answer);
      setStatus('success');
    } catch (err) {
      setStatus('typing');
      setError(err);
    }
  }

  function handleTextareaChange(e) {
    setAnswer(e.target.value);
  }

  return (
    <>
      <h2>City quiz</h2>
      <p>
      What city is located on two continents?
      </p>
      <form onSubmit={handleSubmit}>
        <textarea
          onChange={handleTextareaChange}
          disabled={status === 'submitting'}
          value={answer}
        />
        <br />
        <button disabled={
        status === 'submitting' || answer.length === 0 
        }>
          Submit
        </button>
        {error !== null &&
          <p className="Error" style={{color: 'red'}} >
            {error.message}
          </p>
        }
      </form>
    </>
  );
}

function submitForm(answer) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let shouldError = answer.toLowerCase() !== 'istanbul'
      if (shouldError) {
        reject(new Error('Good guess but a wrong answer. Try again!' ));
      } else {
        resolve();
      }
    }, 1500);
  });
}

export default Form;