import { useCallback, useEffect, useState } from "react";
import api from "../api.js";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../components/Toast";

export default function usePolls(path = "/polls") {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const { loadMe } = useAuth();
  const toast = useToast();

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get(path);
      setPolls(data);
    } finally {
      setLoading(false);
    }
  }, [path]);

  useEffect(() => {
    load();
  }, [load]);

  const replace = (p) =>
    setPolls((arr) => arr.map((x) => (String(x._id) === String(p._id) ? p : x)));

  const vote = async (id, value) => {
    const wasVoted = polls.find((p) => String(p._id) === String(id))?.myVote != null;
    await api.post(`/polls/${id}/vote`, { value });

    const { data } = await api.get(`/polls/${id}?noview=true`);
    replace(data);
    toast(wasVoted ? "Vote changed" : "Voted recorded");
    loadMe();
  };

  const unvote = async (id) => {
    try {
      await api.delete(`/polls/${id}/vote`);
      const { data } = await api.get(`/polls/${id}?noview=true`);
      replace(data);
      toast("Vote removed");
      loadMe();
    } catch (err) {
      toast(err.response?.data?.message || "Could not remove vote - is the server running?");
    }
  };

  const bookmark = async (id) => {
    const { data } = await api.post(`/polls/${id}/bookmark`);

    setPolls((arr) =>
      arr.map((x) => (x._id === id ? { ...x, isbookmarked: !x.isbookmarked ? -1 : 1 } : x))
    );
    toast(data.bookmarked ? "Saved" : "Removed from saved");
    loadMe();
  };

  const edit = async (id, payload) => {
    await api.patch(`/polls/${id}`, payload);
    const { data } = await api.get(`/polls/${id}?noview=true`);
    replace(data);
    toast("Poll updated");
  };

  const open = async (id) => {
    const { data } = await api.patch(`/polls/${id}/close`);
    setPolls((arr) =>
      arr.map((x) => (x._id === id ? { ...x, closed: data.closed } : x))
    );
    toast(data.closed ? "Poll closed" : "Poll re-opened");
  };

  const remove = async (id) => {
    await api.delete(`/polls/${id}`);
    setPolls((arr) => arr.filter((x) => x._id !== id));
    toast("Poll deleted");
    loadMe();
  };

  return { polls, loading, load, vote, unvote, bookmark, edit, open, remove };
}


