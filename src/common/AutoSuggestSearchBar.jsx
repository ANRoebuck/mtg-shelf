import React, { useEffect, useState } from 'react';
import { throttle } from 'throttle-debounce';
import './auto-suggest-search-bar.scss';


const AutoSuggestSearchBar = ({
                                onSubmit, getUpdateSuggestions, throttleMillis = 9000, maxSuggestions = 5,
                                optionalExternallyManagedSearchTerm = null,
                                optionalSetExternallyManagedSearchTerm = null,
                                label = null, placeholderText = null, children,
                              }) => {

  const [locallyManagedSearchTerm, setLocallyManagedSearchTerm] = useState('');

  const defaultSuggestions = () => ({ capturedAt: new Date(), values:[] });
  const [suggestions, setSuggestions] = useState(defaultSuggestions());


  // a separate useState and useEffect are combined here to emulate a conditional setState callback
  // setState calls are asynchronous
  // a callback is required to ensure that logic executed only after the state is updated
  // react hooks setState methods do not accept a callback function as an argument
  // useEffect using the searchTerm state would be called on every keystroke, so a separate piece of state is used
  const [v, execute] = useState('');
  useEffect(() => {
    if (v) {
      onSubmit(v);
      setSearchTerm('');
      setSuggestions(defaultSuggestions());
      execute('');
    }
  }, [v]);

  const searchTerm = optionalExternallyManagedSearchTerm || locallyManagedSearchTerm;
  const setSearchTerm = (searchTerm) => optionalSetExternallyManagedSearchTerm ?
    optionalSetExternallyManagedSearchTerm(searchTerm) : setLocallyManagedSearchTerm(searchTerm);


  // this ensures only latest suggestions will be used in a case where async calls resolve out of sequence
  const upDateWithGuaranteedLatest = (term) => {
    const executionTime = new Date();
    getUpdateSuggestions(term).then(suggestions => {
      setSuggestions(prev => prev.capturedAt < executionTime ?
          {capturedAt: executionTime, values: suggestions } : prev);
    });
  };
  const throttledUpdate = (term) => throttle(throttleMillis, upDateWithGuaranteedLatest(term));

  const onChangeSearchTerm = async (event) => {
    const updatedSearchTerm = event.target.value;
    setSearchTerm(updatedSearchTerm);
    throttledUpdate(updatedSearchTerm);
  };

  const suggestionsToDisplay = () => searchTerm ?
    <ul>
      {suggestions.values.slice(0, maxSuggestions)
        .map(suggestion => <li onClick={() => execute(suggestion)}>{suggestion}</li>)}
    </ul>
    : null;

  return (
    <div className="auto-suggest-search-bar">
      <div className="input-container">
        <form onSubmit={(e) => { e.preventDefault(); execute(searchTerm); }}>
          <label>
            {label}
            <div className="auto-complete-input">
              <input type="text" value={searchTerm} placeholder={placeholderText}
                     onChange={(e) => onChangeSearchTerm(e)}
              />
              {suggestionsToDisplay()}
            </div>
          </label>
        </form>
      </div>
      {children ?
        <div className="children">
          {children}
        </div>
        : null}
    </div>

  )
}

export default AutoSuggestSearchBar;
