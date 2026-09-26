type StatsCardProps = {
  title: string
  value: number
}

function StatsCard({ title, value }: StatsCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <p className="text-sm text-gray-500">
        {title}
      </p>

      <p className="text-3xl font-bold text-gray-900 mt-2">
        {value}
      </p>
    </div>
  )
}

export default StatsCard