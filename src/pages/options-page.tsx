import React, { useState } from 'react';
import { connect } from 'react-redux';
import { optionsClosed, optionsSaved } from '../actions';
import { OptionsPage as OptionsPageType } from '../@types/OptionsPage';

function OptionsPageDummy({ onOptionsClose, onOptionsSave }: OptionsPageType) {
  const [option1, setOption1] = useState(false);
  const [option2, setOption2] = useState(true);
  const [option3, setOption3] = useState(false);

  return (
    <>
      <div className="bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40" />
      <div
        data-modal-backdrop="static"
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full justify-center items-center flex"
      >
        <div className="relative w-full h-full max-w-2xl md:h-auto">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Options</h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => onOptionsClose()}
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="relative">
                <label
                  htmlFor="option1"
                  className="inline-flex relative items-center cursor-pointer"
                >
                  <input
                    type="checkbox"
                    name="option1"
                    value=""
                    className="sr-only peer"
                    checked={option1}
                    readOnly
                  />
                  {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                  <div
                    className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
                    onClick={() => setOption1(!option1)}
                  />
                  <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Option 1
                  </span>
                </label>
              </div>
              <div className="relative">
                <label
                  htmlFor="option2"
                  className="inline-flex relative items-center cursor-pointer"
                >
                  <input
                    type="checkbox"
                    name="option2"
                    value=""
                    className="sr-only peer"
                    checked={option2}
                    readOnly
                  />
                  {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                  <div
                    className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
                    onClick={() => setOption2(!option2)}
                  />
                  <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Option 2
                  </span>
                </label>
              </div>
              <div className="relative">
                <label
                  htmlFor="option3"
                  className="inline-flex relative items-center cursor-pointer"
                >
                  <input
                    type="checkbox"
                    name="option3"
                    value=""
                    className="sr-only peer"
                    checked={option3}
                    readOnly
                  />
                  {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                  <div
                    className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
                    onClick={() => setOption3(!option3)}
                  />
                  <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Option 3
                  </span>
                </label>
              </div>
            </div>
            <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => onOptionsSave()}
              >
                Save
              </button>
              <button
                type="button"
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                onClick={() => onOptionsClose()}
              >
                Discard
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const mapDispatchToProps = {
  onOptionsClose: optionsClosed,
  onOptionsSave: optionsSaved,
};

const OptionsPage = connect(null, mapDispatchToProps)(OptionsPageDummy);

export default OptionsPage;
