import { Fragment, useState } from "react";
import clsx from "clsx";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";

import useSelectedTeam from "~/hooks/useSelectedTeam";

import BaseButton from "~/components/generic/button/BaseButton";
import FolderInfoModal from "./FolderInfoModal";

const getProfileFromFullName = (fullName) => {
  const names = fullName.split(" ");

  if (names.length < 2) return fullName.slice(0, 2).toUpperCase();
  return `${names[0][0]}${names[1][0]}`;
};

export default function TeamInfo({ open, setOpen }) {
  const [openEditInfo, setOpenEditInfo] = useState(false);
  const team = useSelectedTeam();

  const { repository, members } = team;

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <div className="fixed inset-0" />

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    {team && (
                      <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                        <div className="p-6">
                          <div className="flex items-start justify-end">
                            <div className="ml-3 flex h-7 items-center">
                              <button
                                type="button"
                                className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-primary"
                                onClick={() => setOpen(false)}
                              >
                                <span className="sr-only">Close panel</span>
                                <XIcon className="h-6 w-6" aria-hidden="true" />
                              </button>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="pb-1 sm:pb-6">
                            <div>
                              <div className="px-4 sm:flex sm:items-end sm:px-6">
                                <div className="sm:flex-1">
                                  <div>
                                    <div className="flex items-center">
                                      <h3 className="text-xl font-bold text-gray-900 sm:text-2xl">
                                        {repository.title}
                                      </h3>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="px-4 py-5 sm:px-0 sm:pt-0">
                            <dl className="space-y-8 px-4 sm:space-y-6 sm:px-6">
                              <div>
                                <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:shrink-0">
                                  Created At
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                                  {/* eslint-disable react/no-danger */}
                                  Senin, 24 Agustus 1998
                                </dd>
                              </div>
                              <div>
                                <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:shrink-0">
                                  Updated At
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                                  Senin, 24 Agustus 2022
                                </dd>
                              </div>
                              <div>
                                <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:shrink-0">
                                  Description
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                                  This is the best description. Use text area to
                                  fill this field!
                                </dd>
                              </div>
                              <div>
                                <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:shrink-0">
                                  Status
                                </dt>
                                <dd className="mt-1 flex items-center gap-1 text-sm text-gray-900 sm:col-span-2">
                                  Ongoing{" "}
                                  <span
                                    className={clsx(
                                      {
                                        "bg-blue-400": true, // Ongoing
                                        "bg-green-400": false, // Done
                                        "bg-yellow-400": false, // Draft
                                        "bg-gray-400": false, // abandoned
                                        "bg-red-400": false, // Critical
                                      },

                                      "  mt-0.5 h-2.5 w-2.5 rounded-full",
                                    )}
                                    aria-hidden="true"
                                  />
                                </dd>
                              </div>
                            </dl>
                          </div>
                        </div>
                        <div className="px-4 sm:px-6">
                          <div className="text-sm font-medium text-gray-500 sm:w-40 sm:shrink-0">
                            Author(s)
                          </div>
                          <ul className="flex-1 divide-y divide-gray-200 overflow-y-auto">
                            {members &&
                              members.map((person) => (
                                <li key={person._id}>
                                  <div className="group relative flex items-center py-6 px-5">
                                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                    <a
                                      href="#"
                                      className="-m-1 block flex-1 p-1"
                                    >
                                      <div
                                        className="absolute inset-0 group-hover:bg-gray-50"
                                        aria-hidden="true"
                                      />
                                      <div className="relative flex min-w-0 flex-1 items-center">
                                        <span className="relative inline-block shrink-0">
                                          {person.pictureUrl ? (
                                            <img
                                              className="h-10 w-10 rounded-full"
                                              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                              alt=""
                                            />
                                          ) : (
                                            <div className="my-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                                              <div className=" text-sm text-primary">
                                                {getProfileFromFullName(
                                                  person.fullName,
                                                )}
                                              </div>
                                            </div>
                                          )}

                                          <span
                                            className={clsx(
                                              {
                                                "bg-green-400":
                                                  person.status === "online",
                                                "bg-gray-300":
                                                  person.status !== "online",
                                              },

                                              "absolute top-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white",
                                            )}
                                            aria-hidden="true"
                                          />
                                        </span>
                                        <div className="ml-4 truncate">
                                          <div className="flex shrink-0 justify-between truncate text-sm">
                                            <span className="font-medium">
                                              {person.fullName}
                                            </span>
                                          </div>
                                          <p className="truncate text-sm text-gray-500">
                                            {`${person.email}`}
                                          </p>
                                        </div>
                                      </div>
                                    </a>
                                  </div>
                                </li>
                              ))}
                          </ul>
                        </div>
                        <BaseButton
                          className="mx-6 mt-2"
                          onClick={() => setOpenEditInfo(true)}
                        >
                          Edit Details
                        </BaseButton>
                      </div>
                    )}
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <FolderInfoModal open={openEditInfo} setOpen={setOpenEditInfo} />
    </>
  );
}