import { useState, useEffect, useCallback } from 'react'
import { getPredictions as apiGetPredictions, runPrediction as apiRunPrediction, getPredictionsByApplicationId as apiGetPredictionsByApplicationId } from '../api/api'
import { normalizePrediction } from '../api/normalize'
import { useUi } from '../contexts/UiProvider'

export default function usePredictions() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const ui = useUi()

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await apiGetPredictions()
      const list = res.data ?? res
      const normalized = (Array.isArray(list) ? list : []).map(normalizePrediction)
      setData(normalized)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  const run = async (applicationId) => {
    setLoading(true)
    try {
      const res = await apiRunPrediction(applicationId)
      const pred = normalizePrediction(res.data ?? res)
      setData((s) => [pred, ...s])
      ui?.showToast({ title: 'Prediction', message: 'Prediction completed', type: 'success' })
      return pred
    } catch (err) {
      setError(err)
      ui?.showToast({ title: 'Prediction failed', message: err?.message || 'Request error', type: 'error' })
      throw err
    } finally { setLoading(false) }
  }

  const fetchForApplication = async (applicationId) => {
    setLoading(true)
    try {
      const res = await apiGetPredictionsByApplicationId(applicationId)
      const list = res.data ?? res
      const normalized = (Array.isArray(list) ? list : []).map(normalizePrediction)
      setData(normalized)
      return normalized
    } catch (err) { setError(err); throw err } finally { setLoading(false) }
  }

  return { data, loading, error, refresh: load, run, fetchForApplication }
}
