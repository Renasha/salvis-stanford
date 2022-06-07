import React, { Fragment, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { HiCheck, HiSelector } from 'react-icons/hi';

const MAJORS = [
    { id: 1, name: 'Computer Science' }
]

const major = [
    { id: 1, name: 'Computer Science' },
    { id: 2, name: 'Arlene Mccoy' },
    { id: 3, name: 'Devon Webb' },
    { id: 4, name: 'Tom Cook' },
    { id: 5, name: 'Tanya Fox' },
    { id: 6, name: 'Hellen Schmidt' },
]

const CS_DEGREE_TRACKS = [
    { id: 1, name: "Artificial Intelligence"},
    { id: 2, name: "Biocomputation"},
    { id: 3, name:  "Computer Engineering"},
    { id: 4, name:  "Graphics"},
    { id: 5, name: "Human-Computer Interaction"},
    { id: 6, name: "Information"},
    { id: 7, name: "Systems"},
    { id: 8, name: "Theory"},
    { id: 9, name: "Unspecialized"}]

export default function CustomCombobox() {
    const [selected, setSelected] = useState(MAJORS[0])
    const [query, setQuery] = useState('')

    const filteredMajor =
        query === ''
            ? MAJORS
            : MAJORS.filter((major) =>
                major.name
                    .toLowerCase()
                    .replace(/\s+/g, '')
                    .includes(query.toLowerCase().replace(/\s+/g, ''))
            )

    return (
        <div className="w-full">
            <Combobox value={selected} onChange={setSelected}>
                <div className="relative">
                    <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md sm:text-sm">
                        <Combobox.Input
                            className="focus:outline-none w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900"
                            displayValue={(major) => major.name}
                            onChange={(event) => setQuery(event.target.value)}
                        />
                        <Combobox.Button className="focus:outline-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <HiSelector
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                            />
                        </Combobox.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setQuery('')}
                    >
                        <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {filteredMajor.length === 0 && query !== '' ? (
                                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                    Nothing found.
                                </div>
                            ) : (
                                filteredMajor.map((major) => (
                                    <Combobox.Option
                                        key={major.id}
                                        className={({ active }) =>
                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-green-600 text-white' : 'text-gray-900'
                                            }`
                                        }
                                        value={major}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <span
                                                    className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                        }`}
                                                >
                                                    {major.name}
                                                </span>
                                                {selected ? (
                                                    <span
                                                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-green-600'
                                                            }`}
                                                    >
                                                        <HiCheck className="h-5 w-5" aria-hidden="true" />
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Combobox.Option>
                                ))
                            )}
                        </Combobox.Options>
                    </Transition>
                </div>
            </Combobox>
        </div>
    )
}