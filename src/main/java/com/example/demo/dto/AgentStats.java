package com.example.demo.dto;

public class AgentStats {

    private long totalAgents;
    private long verifiedAgents;
    private long pendingAgents;
    private long suspendedAgents;

    public AgentStats(
            long totalAgents,
            long verifiedAgents,
            long pendingAgents,
            long suspendedAgents
    ) {
        this.totalAgents = totalAgents;
        this.verifiedAgents = verifiedAgents;
        this.pendingAgents = pendingAgents;
        this.suspendedAgents = suspendedAgents;
    }

    public long getTotalAgents() {
        return totalAgents;
    }

    public long getVerifiedAgents() {
        return verifiedAgents;
    }

    public long getPendingAgents() {
        return pendingAgents;
    }

    public long getSuspendedAgents() {
        return suspendedAgents;
    }
}