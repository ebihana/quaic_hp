export interface QuantumBattleConfig {
  learningMethod: string;
  placement: string;
  qubits: number;
  layers: number;
  embedding: string;
  entanglement: string;
  reward: string;
  qmap: string;
  action: string;
  board: number[][];
  playerAPieces: { good: number[][]; bad: number[][] };
  playerBPieces: { good: number[][]; bad: number[][] };
}

export interface Hyperparameters {
  learningRate: number;
  batchSize: number;
  epochs: number;
  validation: number;
  epsilon: number;
  epsilonDecay: number;
  replayBuffer: number;
  gamma: number;
  dropout: number;
  l2Reg: number;
  optimizer: string;
  scheduler: string;
}

export interface ModuleConfig {
  placement: {
    type: string;
    player_a_bottom: boolean;
    player_b_top: boolean;
    my_pieces_only: number[][];
    escape_positions: {
      player_a: number[][];
      player_b: number[][];
    };
    coordinate_system: string;
    opponent_unknown: boolean;
    rule_compliant: boolean;
  };
  quantum: {
    n_qubits: number;
    n_layers: number;
    embedding_type: string;
    entanglement: string;
    total_params: number;
  };
  reward: {
    strategy: string;
    capture_good_reward: number;
    capture_bad_penalty: number;
    escape_reward: number;
    captured_good_penalty: number;
    captured_bad_reward: number;
    win_condition_rewards: {
      escape_win: number;
      eliminate_all_good: number;
      eliminate_all_bad: number;
    };
    position_rewards: {
      advance_toward_escape: number;
      center_control: number;
      opponent_territory: number;
    };
  };
  qmap: {
    method: string;
    state_dim: number;
    action_dim: number;
    selected_channels: number;
    state_channels: Record<string, number>;
    legal_moves_only: boolean;
    game_engine: string;
    move_validation: boolean;
  };
  action: {
    strategy: string;
    epsilon: number | null;
    temperature: number | null;
  };
}