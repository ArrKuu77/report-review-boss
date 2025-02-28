import ReportReview from "../components/ReportReview"

function Reports() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-foreground dark:text-white">Reports Overview</h1>
        <p className="text-muted-foreground dark:text-gray-400">View and manage all reports in one place</p>
      </div>
      <ReportReview />
    </div>
  )
}

export default Reports

