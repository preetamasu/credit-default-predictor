export default function Prediction() {
  return (
    <div>
      <h3 className="text-xl font-medium mb-4">Run Prediction</h3>
      <p className="text-sm text-gray-500 mb-4">Select an application and run the default-risk model. Results will appear here.</p>

      <div className="bg-sky-50 dark:bg-slate-800 p-4 rounded border">
        <p className="text-sm text-gray-500">No ML service connected yet.</p>
      </div>
    </div>
  )
}
