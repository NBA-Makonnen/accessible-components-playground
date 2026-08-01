import { useRef, useState } from 'react'
import { Modal } from './playground/Modal'
import { Tabs } from './playground/Tabs'
import { Disclosure } from './playground/Disclosures' 

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const modalTriggerRef = useRef<HTMLButtonElement>(null)

  return (
    <div className="p-8 font-sans">
      <h1 className="text-2xl font-bold mb-8">Component Playground</h1>
      
      {/* 1. Custom Disclosure */}
      <section className="mb-12">
        <h2 className="text-xl mb-4 font-semibold">1. Disclosure Pattern</h2>
        <Disclosure id="disc-1" title="Click to expand this section">
          <p className="text-gray-700">This is the hidden content! It manages its own state and uses proper ARIA attributes to announce itself to screen readers.</p>
        </Disclosure>
      </section>

      {/* 2. Custom Tabs */}
      <section className="mb-12">
        <h2 className="text-xl mb-4 font-semibold">2. Tabs Pattern</h2>
        <Tabs 
          ariaLabel="Playground Tabs"
          tabs={[
            { id: 'tab1', label: 'Account', content: <p className="text-gray-700">Make changes to your account here.</p> },
            { id: 'tab2', label: 'Password', content: <p className="text-gray-700">Change your password here. After saving, you'll be logged out.</p> },
            { id: 'tab3', label: 'Settings', content: <p className="text-gray-700">Manage your subscription and billing details.</p> }
          ]} 
        />
      </section>

      {/* 3. Custom Modal */}
      <section className="mb-12">
        <h2 className="text-xl mb-4 font-semibold">3. Modal Dialog Pattern</h2>
        <button 
          ref={modalTriggerRef}
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
        >
          Open Modal
        </button>
        <Modal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          title="Accessible Modal"
          triggerRef={modalTriggerRef}
        >
          <p className="my-4 text-gray-700">
            This modal traps focus inside of it. Try pressing the <strong>Tab</strong> key to cycle through focusable elements, or press the <strong>Escape</strong> key to close it!
          </p>
          <div className="flex flex-col gap-3 mt-4">
            <input type="text" placeholder="Focusable input" className="border p-2 rounded" />
            <a href="#" className="text-blue-600 underline">Focusable link</a>
          </div>
        </Modal>
      </section>

    </div>
  )
}

export default App