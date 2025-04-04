"use client";

import { useState } from "react";
import { UserData } from "@/lib/auth";

interface AdminComponentProps {
  userData: UserData;
}

export default function AdminComponent({ userData }: AdminComponentProps) {
  const [activeTab, setActiveTab] = useState("users");
  
  return (
    <div>
      <div className="mb-8 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab("users")}
            className={`${
              activeTab === "users"
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            User Management
          </button>
          <button
            onClick={() => setActiveTab("doctors")}
            className={`${
              activeTab === "doctors"
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Doctor Management
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`${
              activeTab === "settings"
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            System Settings
          </button>
        </nav>
      </div>

      {activeTab === "users" && (
        <div>
          <h2 className="text-xl font-semibold mb-4">User Management</h2>
          <div className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex justify-between mb-4">
                <input
                  type="text"
                  placeholder="Search users..."
                  className="border border-gray-300 dark:border-gray-700 dark:bg-gray-800 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary w-64"
                />
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Add New User
                </button>
              </div>
              
              <div className="mt-6">
                <p className="text-gray-500 dark:text-gray-400">
                  No users found. Add some users to get started.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "doctors" && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Doctor Management</h2>
          <div className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex justify-between mb-4">
                <input
                  type="text"
                  placeholder="Search doctors..."
                  className="border border-gray-300 dark:border-gray-700 dark:bg-gray-800 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary w-64"
                />
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Add New Doctor
                </button>
              </div>
              
              <div className="mt-6">
                <p className="text-gray-500 dark:text-gray-400">
                  No doctors found. Add some doctors to get started.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "settings" && (
        <div>
          <h2 className="text-xl font-semibold mb-4">System Settings</h2>
          <div className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <form className="space-y-6">
                <div>
                  <label htmlFor="site-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Site Name
                  </label>
                  <input
                    type="text"
                    name="site-name"
                    id="site-name"
                    defaultValue="HealthConnect"
                    className="mt-1 block w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                  />
                </div>
                
                <div>
                  <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    name="contact-email"
                    id="contact-email"
                    defaultValue="contact@healthconnect.com"
                    className="mt-1 block w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Theme
                  </label>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center">
                      <input
                        id="light"
                        name="theme"
                        type="radio"
                        defaultChecked
                        className="focus:ring-primary h-4 w-4 text-primary border-gray-300"
                      />
                      <label htmlFor="light" className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Light
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="dark"
                        name="theme"
                        type="radio"
                        className="focus:ring-primary h-4 w-4 text-primary border-gray-300"
                      />
                      <label htmlFor="dark" className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Dark
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="system"
                        name="theme"
                        type="radio"
                        className="focus:ring-primary h-4 w-4 text-primary border-gray-300"
                      />
                      <label htmlFor="system" className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        System Default
                      </label>
                    </div>
                  </div>
                </div>
                
                <div>
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    Save Settings
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
